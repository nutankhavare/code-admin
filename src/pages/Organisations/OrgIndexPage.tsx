import React, { useState } from "react";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Organisation.css";
import DeleteModal from "../../Components/UI/DeleteModal";
import {
  initialOrganisations,
  ORG_TYPE_LABELS,
  ORG_TYPES,
  type Organisation,
  type OrgType,
} from "./organisation.types";

const OrgIndexPage: React.FC = () => {
  const navigate = useNavigate();

  const [organisations, setOrganisations] =
    useState<Organisation[]>(initialOrganisations);

  const [deleteTarget, setDeleteTarget] = useState<Organisation | null>(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"ALL" | OrgType>("ALL");

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      setOrganisations((prev) => prev.filter((o) => o.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  const filtered = organisations.filter((org) => {
    const searchText = search.toLowerCase();

    const matchSearch =
      org.name.toLowerCase().includes(searchText) ||
      org.domain.toLowerCase().includes(searchText) ||
      org.regNumber.toLowerCase().includes(searchText);

    const matchType = typeFilter === "ALL" || org.type === typeFilter;

    return matchSearch && matchType;
  });

  const deleteOrganisation = (org: Organisation) => {
    setDeleteTarget(org);
  };

  return (
    <div className="page-container">
      {deleteTarget && (
        <DeleteModal
          itemName={deleteTarget.name}
          itemLabel="organisation"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
      {/* HEADER */}
      <div className="page-header-bar">
        <div className="breadcrumb-container">
          <span className="breadcrumb-current">ORGANISATION MANAGEMENT</span>
        </div>

        <button
          className="btn btn--header-add"
          onClick={() => navigate("/Organisation/create")}
        >
          <Plus size={16} /> Onboard
        </button>
      </div>

      {/* SEARCH + FILTER */}
      <div className="card">
        <div className="table-toolbar">
          <input
            className="search-input"
            placeholder="Search name, domain or reg number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="filter-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as "ALL" | OrgType)}
          >
            <option value="ALL">All Types</option>

            {ORG_TYPES.map((t) => (
              <option key={t} value={t}>
                {ORG_TYPE_LABELS[t]}
              </option>
            ))}
          </select>
        </div>

        {/* TABLE */}

        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Organisation</th>
              <th>Domain</th>
              <th>Reg Number</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="table-empty">
                  No organisations found
                </td>
              </tr>
            ) : (
              filtered.map((org, index) => (
                <tr key={org.id}>
                  <td>{index + 1}</td>

                  <td>
                    <span className="org-type-badge">
                      🏢 {org.type.replace(/_/g, " ")}
                    </span>
                  </td>

                  <td>
                    <div className="org-name-cell">{org.name}</div>
                    <div className="org-location-cell">
                      {org.city}, {org.state}
                    </div>
                  </td>

                  <td>
                    <span className="org-domain-tag">{org.domain}</span>
                  </td>

                  <td>
                    <span className="org-reg-text">{org.regNumber}</span>
                  </td>

                  <td>
                    <span
                      className="status-badge"
                      style={{
                        background:
                          org.status === "Active" ? "#10b98120" : "#ef444420",
                        color: org.status === "Active" ? "#10b981" : "#ef4444",
                      }}
                    >
                      {org.status}
                    </span>
                  </td>

                  <td>
                    <div className="table-actions">
                      <button
                        className="action-btn action-btn--view"
                        title="View"
                        onClick={() =>
                          navigate(`/Organisation/view/${org.id}`)
                        }
                      >
                        <Eye size={15} />
                      </button>

                      <button
                        className="action-btn action-btn--edit"
                        title="Edit"
                        onClick={() => {
                          const typeRoute: Record<string, string> = {
                            OFFICE: "office",
                            INSTITUTION: "institution",
                            MOTOR_DRIVING_SCHOOL: "mds",
                            VENDOR: "vendor",
                          };
                          const route = typeRoute[org.type] ?? "office";
                          navigate(`/Organisation/edit/${route}/${org.id}`);
                        }}
                      >
                        <Pencil size={15} />
                      </button>

                      <button
                        className="action-btn action-btn--delete"
                        title="Delete"
                        onClick={() => deleteOrganisation(org)}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrgIndexPage;
