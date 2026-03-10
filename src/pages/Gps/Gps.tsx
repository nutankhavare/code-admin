import React, { useRef, useState } from "react";
import "./Gps.css";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../Components/Table/Pagination.tsx";
import Table, { type Column } from "../../Components/Table/Table.tsx";
import DeleteModal from "../../Components/UI/DeleteModal";
import type { GpsDevice } from "./gpsDevice.types.ts";

const mockGps: GpsDevice[] = Array.from({ length: 14 }, (_, i) => ({
  id: i + 1,
  deviceId: `GPS-${String(i + 2001).padStart(4, "0")}`,
  imei: `35${String(i + 100000000000000).slice(1)}`,
  model: [
    "Teltonika FMB920",
    "Queclink GL300",
    "Concox AT4",
    "Ruptela FM-Eco4",
  ][i % 4],
  organisation: ["TechCorp", "InfoSys", "Wipro", "HCL"][i % 4],
  assignedTo: `Vehicle ${i + 1}`,
  lat: (12.9716 + i * 0.01).toFixed(4),
  lng: (77.5946 + i * 0.01).toFixed(4),
  speed: i % 3 === 0 ? 0 : Math.floor(Math.random() * 80) + 20,
  status: (i % 5 === 0
    ? "Offline"
    : i % 3 === 0
      ? "Stationary"
      : "Moving") as GpsDevice["status"],
  lastUpdate: new Date(Date.now() - i * 1800000).toLocaleString("en-IN"),
}));

const statusColors: Record<string, string> = {
  Moving: "#10b981",
  Stationary: "#f59e0b",
  Offline: "#ef4444",
};

const GpsDevices: React.FC = () => {
  const navigate = useNavigate();

  const [devices, setDevices] = useState(mockGps);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);

  const [deleteTarget, setDeleteTarget] = useState<GpsDevice | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const perPage = 10;

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      setDevices((prev) => prev.filter((d) => d.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  const filtered = devices
    .filter(
      (g) =>
        g.deviceId.toLowerCase().includes(search.toLowerCase()) ||
        g.model.toLowerCase().includes(search.toLowerCase()),
    )
    .filter((g) => (statusFilter === "All" ? true : g.status === statusFilter));

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const deleteGps = (row: GpsDevice) => {
    setDeleteTarget(row);
  };

  const exportCSV = () => {
    const csv = [
      "DeviceID,Model,IMEI,Organisation,AssignedTo,Speed,Status",
      ...devices.map(
        (d) =>
          `${d.deviceId},${d.model},${d.imei},${d.organisation},${d.assignedTo},${d.speed},${d.status}`,
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "gps_devices.csv";
    a.click();
  };

  const columns: Column<GpsDevice>[] = [
    { key: "deviceId", label: "Device ID" },
    { key: "model", label: "Model" },
    { key: "imei", label: "IMEI" },
    { key: "organisation", label: "Organisation" },
    { key: "assignedTo", label: "Assigned To" },

    {
      key: "speed",
      label: "Speed",
      render: (val) => `${val} km/h`,
    },

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

    { key: "lastUpdate", label: "Last Update" },

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
              navigate(`/masters/gps-devices/view/${row.id}`);
            }}
          >
            <Eye size={15} />
          </button>

          <button
            className="action-btn action-btn--edit"
            title="Edit"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/masters/gps-devices/edit/${row.id}`);
            }}
          >
            <Pencil size={15} />
          </button>

          <button
            className="action-btn action-btn--delete"
            title="Delete"
            onClick={(e) => {
              e.stopPropagation();
              deleteGps(row);
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
          itemName={deleteTarget.deviceId}
          itemLabel="GPS device"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
      <div className="page-header-bar">
        <div className="breadcrumb-container">
          <span className="breadcrumb-current">GPS DEVICES</span>
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
            onClick={() => navigate("/masters/gps-devices/add")}
          >
            <Plus size={16} /> Add GPS Device
          </button>
        </div>

        <input type="file" ref={fileInputRef} style={{ display: "none" }} />
      </div>

      <div className="card">
        <div className="table-toolbar">
          <input
            className="search-input"
            placeholder="Search GPS devices..."
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
            <option value="Moving">Moving</option>
            <option value="Stationary">Stationary</option>
            <option value="Offline">Offline</option>
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

export default GpsDevices;
