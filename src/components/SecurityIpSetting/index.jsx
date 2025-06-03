import React, { useState, useEffect } from "react";
import ReactFlow, { Background } from "reactflow";
import Modal from "../Modal";
import { LOCAL_STORAGE_KEY, cidrRegex, NETWORK_MODE } from "./constant";

import "reactflow/dist/style.css";
import "./index.css";

function IpWhitelistingFlow() {
  // State hooks for IP list, opt-out acknowledgment, save status, mode, flow nodes/edges, and modal
  const [ipList, setIpList] = useState([""]);
  const [acknowledged, setAcknowledged] = useState(false);
  const [saved, setSaved] = useState(false);
  const [mode, setMode] = useState(NETWORK_MODE.WHITELIST);

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const [modal, setModal] = useState({ open: false, message: "" });

  // Load settings from localStorage on mount
  useEffect(() => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      setIpList(parsed.ipList || [""]);
      setAcknowledged(parsed.acknowledged);
      setMode(parsed.mode || NETWORK_MODE.WHITELIST);
      setSaved(true);
    }
  }, []);

  // Update ReactFlow nodes/edges when relevant state changes
  useEffect(() => {
    // Only include valid IPs in the flow output
    const validIps = ipList.filter((ip) => ip && cidrRegex.test(ip));
    const nodes = [
      {
        id: "1",
        data: { label: "Start Configuration" },
        position: { x: 50, y: 0 },
        type: "input",
      },
      {
        id: "2",
        data: { label: "Enter IPs" },
        position: { x: 0, y: 100 },
      },
      {
        id: "3",
        data: { label: "Acknowledge Risks?" },
        position: { x: 200, y: 100 },
      },
      {
        id: "4",
        data: {
          label:
            mode === NETWORK_MODE.OPTOUT
              ? "Opted Out (All IPs Allowed)"
              : `Whitelisted IPs: ${validIps.join(", ")}`,
        },
        position: { x: 100, y: 200 },
        type: "output",
      },
    ];

    const edges = [
      {
        id: "e1-2",
        source: "1",
        target: mode === NETWORK_MODE.WHITELIST ? "2" : "3",
      },
      ...(mode === NETWORK_MODE.WHITELIST
        ? [{ id: "e2-4", source: "2", target: "4" }]
        : [{ id: "e3-4", source: "3", target: "4" }]),
    ];

    setNodes(nodes);
    setEdges(edges);
  }, [ipList, acknowledged, mode]);

  const handleIpChange = (index, value) => {
    const newList = [...ipList];
    newList[index] = value;
    setIpList(newList);
  };

  const addIp = () => setIpList([...ipList, ""]);

  const removeIp = (index) => setIpList(ipList.filter((_, i) => i !== index));

  const validateAllIps = () => ipList.every((ip) => !ip || cidrRegex.test(ip));

  const handleSave = () => {
    if (mode === NETWORK_MODE.OPTOUT) {
      if (!acknowledged) {
        setModal({
          open: true,
          message: "Please acknowledge the risks to opt out.",
        });
        return;
      }
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({ ipList: [], acknowledged, mode })
      );
      setSaved(true);
      setModal({ open: true, message: "Settings saved!" });
      return;
    }

    const isValid = validateAllIps();
    if (isValid) {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({ ipList, acknowledged: false, mode })
      );
      setSaved(true);
      setModal({ open: true, message: "Settings saved!" });
    } else {
      setModal({ open: true, message: "Please correct invalid IP addresses." });
    }
  };

  return (
    <div className="app-container">
      {/* Modal for feedback and errors */}
      <Modal
        open={modal.open}
        message={modal.message}
        onClose={() => setModal({ open: false, message: "" })}
      />
      <div className="left-col">
        <h2>Network Security Settings</h2>
        <p>Configure IP whitelisting for secure account access.</p>

        {/* Mode selection: whitelist or opt out */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label>
            <input
              type="radio"
              name="mode"
              value={NETWORK_MODE.WHITELIST}
              checked={mode === NETWORK_MODE.WHITELIST}
              onChange={() => {
                setMode(NETWORK_MODE.WHITELIST);
                setAcknowledged(false);
              }}
            />
            Manage allowed IPs
          </label>
          <label style={{ marginLeft: "1.5rem" }}>
            <input
              type="radio"
              name="mode"
              value={NETWORK_MODE.OPTOUT}
              checked={mode === NETWORK_MODE.OPTOUT}
              onChange={() => setMode(NETWORK_MODE.OPTOUT)}
            />
            Opt out of IP whitelisting
          </label>
        </div>

        {mode === NETWORK_MODE.WHITELIST && (
          <>
            <h2>Trusted IP Addresses (CIDR format)</h2>
            {ipList.map((ip, idx) => (
              <div
                key={idx}
                className="ip-row"
                style={{ flexDirection: "column", alignItems: "stretch" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <input
                    type="text"
                    value={ip}
                    placeholder="e.g. 192.168.1.0/24"
                    onChange={(e) => handleIpChange(idx, e.target.value)}
                  />
                  <button onClick={() => removeIp(idx)}>Remove</button>
                </div>
                {ip && !cidrRegex.test(ip) && (
                  <span
                    className="error"
                    style={{ marginLeft: 0, marginTop: "0.2rem" }}
                  >
                    Please enter a valid CIDR format, like 192.168.0.0/24.
                  </span>
                )}
              </div>
            ))}
            <button className="add-ip-btn" onClick={addIp}>
              + Add IP
            </button>
          </>
        )}

        {/* Opt-out acknowledgment */}
        {mode === NETWORK_MODE.OPTOUT && (
          <div className="ack-box">
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
            />
            <label>
              I understand the risks of not restricting IPs. All IPs will have
              access.
            </label>
          </div>
        )}

        <button className="save-btn" onClick={handleSave}>
          Save Settings
        </button>

        {saved && (
          <div className="status-box">
            <h3>Settings Saved</h3>
            <p>
              {mode === NETWORK_MODE.OPTOUT
                ? "IP restriction is disabled. All IPs can access."
                : `Whitelisted IPs: ${ipList
                    .filter((ip) => ip && cidrRegex.test(ip))
                    .join(", ")}`}
            </p>
          </div>
        )}
      </div>
      {/* Right column: shows the configuration flow diagram */}
      <div className="right-col">
        <h2>Configuration Flow</h2>
        <div style={{ height: 400 }}>
          <ReactFlow nodes={nodes} edges={edges} fitView>
            <Background />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}

export default IpWhitelistingFlow;
