import React, { useRef, useState } from "react";
import "./Beacon.css";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../Components/Table/Pagination";
import Table, { type Column } from "../../Components/Table/Table";
import DeleteModal from "../../Components/UI/DeleteModal";
import type { BeaconDevice } from "./beacondevice.types";

const mockBeacons: BeaconDevice[] = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  deviceId: `BCN-${String(i + 1001).padStart(4, "0")}`,
  name: `Beacon ${i + 1}`,
  macAddress: `AA:BB:CC:DD:${String(i).padStart(2, "0")}:FF`,
  organisation: ["TechCorp", "InfoSys", "Wipro", "HCL"][i % 4],
  lastSeen: new Date(Date.now() - i * 3600000).toLocaleString("en-IN"),
  battery: Math.max(5, 100 - i * 6),
  status: (i % 5 === 0
    ? "Offline"
    : i % 7 === 0
      ? "Low Battery"
      : "Online") as BeaconDevice["status"],
}));

const statusColors: Record<string, string> = {
  Online: "#10b981",
  Offline: "#ef4444",
  "Low Battery": "#f59e0b",
};

const BeaconDevices: React.FC = () => {
  const navigate = useNavigate();

  const [beacons, setBeacons] = useState(mockBeacons);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<BeaconDevice | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const perPage = 10;

  const filtered = beacons
    .filter(
      (b) =>
        b.deviceId.toLowerCase().includes(search.toLowerCase()) ||
        b.name.toLowerCase().includes(search.toLowerCase()),
    )
    .filter((b) => (statusFilter === "All" ? true : b.status === statusFilter));

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      setBeacons((prev) => prev.filter((d) => d.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  const exportCSV = () => {
    const csv = [
      "DeviceID,Name,MAC Address,Organisation,Battery,Status",
      ...beacons.map(
        (d) =>
          `${d.deviceId},${d.name},${d.macAddress},${d.organisation},${d.battery},${d.status}`,
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "beacon_devices.csv";
    a.click();
  };

  const columns: Column<BeaconDevice>[] = [
    { key: "deviceId", label: "Device ID" },
    { key: "name", label: "Name" },
    { key: "macAddress", label: "MAC Address" },
    { key: "organisation", label: "Organisation" },

    {
      key: "battery",
      label: "Battery",
      render: (val) => (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div
            style={{
              width: 60,
              height: 8,
              background: "#e5e7eb",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${val}%`,
                height: "100%",
                background:
                  Number(val) < 20
                    ? "#ef4444"
                    : Number(val) < 50
                      ? "#f59e0b"
                      : "#10b981",
              }}
            />
          </div>
          <span>{String(val)}%</span>
        </div>
      ),
    },

    { key: "lastSeen", label: "Last Seen" },

    {
      key: "status",
      label: "Status",
      render: (val) => (
        <span
          className="status-badge"
          style={{
            background: statusColors[String(val)] + "20",
            color: statusColors[String(val)],
          }}
        >
          {String(val)}
        </span>
      ),
    },

    {
      key: "actions",
      label: "Actions",
      render: (_value, row) => (
        <div className="table-actions">
          <button
            className="action-btn action-btn--view"
            title="View"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/masters/beacon-devices/view/${row.id}`);
            }}
          >
            <Eye size={15} />
          </button>

          <button
            className="action-btn action-btn--edit"
            title="Edit"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/masters/beacon-devices/edit/${row.id}`);
            }}
          >
            <Pencil size={15} />
          </button>

          <button
            className="action-btn action-btn--delete"
            title="Delete"
            onClick={(e) => {
              e.stopPropagation();
              setDeleteTarget(row);
            }}
          >
            <Trash2 size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="page-container">
      {deleteTarget && (
        <DeleteModal
          itemName={deleteTarget.name}
          itemLabel="beacon device"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      <div className="page-header-bar">
        <div className="breadcrumb-container">
          <span className="breadcrumb-current">BEACON DEVICES</span>
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            className="btn btn--outline"
            onClick={() => fileInputRef.current?.click()}
          >
            Import
          </button>

          <button className="btn btn--outline" onClick={exportCSV}>
            Export
          </button>

          <button
            className="btn btn--header-add"
            onClick={() => navigate("/masters/beacon-devices/add")}
          >
            <Plus size={16} /> Add Device
          </button>
        </div>

        <input type="file" ref={fileInputRef} style={{ display: "none" }} />
      </div>

      <div className="card">
        <div className="table-toolbar">
          <input
            className="search-input"
            placeholder="Search devices..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="All">All Status</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
            <option value="Low Battery">Low Battery</option>
          </select>
        </div>

        <Table columns={columns} data={paginated} />

        <Pagination
          currentPage={page}
          totalPages={Math.ceil(filtered.length / perPage)}
          onPageChange={setPage}
          totalItems={filtered.length}
          itemsPerPage={perPage}
        />
      </div>
    </div>
  );
};

export default BeaconDevices;
