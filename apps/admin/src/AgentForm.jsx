"use client";

import React, { useState } from "react";
import "./agentForm.css"; // make sure this path is correct in your project
import { submitAgent } from "./api/agent";

export function AgentForm({ categories = [], initialData }) {
  const emptySection = () => ({
    title: "",
    content: [{ subHeading: "", subDescription: [""] }],
  });

  const [form, setForm] = useState({
    agentName: initialData?.agentName ?? "",
    logo: initialData?.logo ?? "",
    category: initialData?.category ?? "",
    tagline: initialData?.tagline ?? "",
    shortDescription: initialData?.shortDescription ?? "",
    affiliatedOrNot: initialData?.affiliatedOrNot ?? false,
    agentLink: initialData?.agentLink ?? "",
    otherLinks: initialData?.otherLinks ?? [{ title: "", url: "" }],
    subscriptionType: initialData?.subscriptionType ?? "free",
    openSource: initialData?.openSource ?? false,
    overview: initialData?.overview ?? "",
    otherInformation: initialData?.otherInformation ?? [emptySection()],
    runningCommands: initialData?.runningCommands ?? [""],
    installationCommands: initialData?.installationCommands ?? [""],
    tags: initialData?.tags ?? [""],
  });

  // Generic update helpers
  const setField = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  // ---------- Other Links handlers ----------
  const updateOtherLink = (idx, key, value) => {
    setForm((s) => {
      const arr = s.otherLinks.map((x, i) =>
        i === idx ? { ...x, [key]: value } : x
      );
      return { ...s, otherLinks: arr };
    });
  };
  const addOtherLink = () =>
    setForm((s) => ({
      ...s,
      otherLinks: [...s.otherLinks, { title: "", url: "" }],
    }));
  const removeOtherLink = (idx) =>
    setForm((s) => ({
      ...s,
      otherLinks: s.otherLinks.filter((_, i) => i !== idx),
    }));

  // ---------- Running/Installation Commands ----------
  const updateArrayField = (field, idx, value) => {
    setForm((s) => {
      const arr = [...s[field]];
      arr[idx] = value;
      return { ...s, [field]: arr };
    });
  };
  const addToArrayField = (field) =>
    setForm((s) => ({ ...s, [field]: [...s[field], ""] }));
  const removeFromArrayField = (field, idx) =>
    setForm((s) => ({ ...s, [field]: s[field].filter((_, i) => i !== idx) }));

  // ---------- OtherInformation handlers (nested) ----------
  const addSection = () =>
    setForm((s) => ({
      ...s,
      otherInformation: [...s.otherInformation, emptySection()],
    }));
  const removeSection = (sIdx) =>
    setForm((s) => ({
      ...s,
      otherInformation: s.otherInformation.filter((_, i) => i !== sIdx),
    }));

  const updateSectionTitle = (sIdx, value) =>
    setForm((s) => {
      const arr = s.otherInformation.map((sec, i) =>
        i === sIdx ? { ...sec, title: value } : sec
      );
      return { ...s, otherInformation: arr };
    });

  const addContentItem = (sIdx) =>
    setForm((s) => {
      const arr = s.otherInformation.map((sec, i) =>
        i === sIdx
          ? {
              ...sec,
              content: [
                ...sec.content,
                { subHeading: "", subDescription: [""] },
              ],
            }
          : sec
      );
      return { ...s, otherInformation: arr };
    });

  const removeContentItem = (sIdx, cIdx) =>
    setForm((s) => {
      const arr = s.otherInformation.map((sec, i) =>
        i === sIdx
          ? { ...sec, content: sec.content.filter((_, ci) => ci !== cIdx) }
          : sec
      );
      return { ...s, otherInformation: arr };
    });

  const updateContentHeading = (sIdx, cIdx, value) =>
    setForm((s) => {
      const arr = s.otherInformation.map((sec, i) =>
        i === sIdx
          ? {
              ...sec,
              content: sec.content.map((c, ci) =>
                ci === cIdx ? { ...c, subHeading: value } : c
              ),
            }
          : sec
      );
      return { ...s, otherInformation: arr };
    });

  const addSubDescription = (sIdx, cIdx) =>
    setForm((s) => {
      const arr = s.otherInformation.map((sec, i) =>
        i === sIdx
          ? {
              ...sec,
              content: sec.content.map((c, ci) =>
                ci === cIdx
                  ? { ...c, subDescription: [...c.subDescription, ""] }
                  : c
              ),
            }
          : sec
      );
      return { ...s, otherInformation: arr };
    });

  const removeSubDescription = (sIdx, cIdx, dIdx) =>
    setForm((s) => {
      const arr = s.otherInformation.map((sec, i) =>
        i === sIdx
          ? {
              ...sec,
              content: sec.content.map((c, ci) =>
                ci === cIdx
                  ? {
                      ...c,
                      subDescription: c.subDescription.filter(
                        (_, di) => di !== dIdx
                      ),
                    }
                  : c
              ),
            }
          : sec
      );
      return { ...s, otherInformation: arr };
    });

  const updateSubDescription = (sIdx, cIdx, dIdx, value) =>
    setForm((s) => {
      const arr = s.otherInformation.map((sec, i) =>
        i === sIdx
          ? {
              ...sec,
              content: sec.content.map((c, ci) =>
                ci === cIdx
                  ? {
                      ...c,
                      subDescription: c.subDescription.map((d, di) =>
                        di === dIdx ? value : d
                      ),
                    }
                  : c
              ),
            }
          : sec
      );
      return { ...s, otherInformation: arr };
    });

  // ---------- submit & sanitize ----------
  const sanitizeBeforeSubmit = (raw) => {
    const cleanLinks = raw.otherLinks
      .map((l) => ({ title: l.title?.trim(), url: l.url?.trim() }))
      .filter((l) => l.title || l.url);

    const cleanArray = (arr) => arr.map((a) => a.trim()).filter(Boolean);

    const cleanOtherInfo = raw.otherInformation
      .map((section) => {
        const title = section.title?.trim();
        const content = section.content
          .map((item) => {
            const subHeading = item.subHeading?.trim();
            const subDescription = (item.subDescription || [])
              .map((d) => d?.trim())
              .filter(Boolean);
            // keep item if heading or any subDescription exists
            if (!subHeading && subDescription.length === 0) return null;
            return { subHeading: subHeading || "", subDescription };
          })
          .filter(Boolean);
        if (!title && content.length === 0) return null;
        return { title: title || "", content };
      })
      .filter(Boolean);

    return {
      ...raw,
      otherLinks: cleanLinks,
      runningCommands: cleanArray(raw.runningCommands),
      installationCommands: cleanArray(raw.installationCommands),
      tags: cleanArray(raw.tags),
      otherInformation: cleanOtherInfo,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = sanitizeBeforeSubmit(form);
    // onSubmit?.(payload);
    // optional: console.log(payload)
    try {
      const data = await submitAgent(payload);
      console.log("Agent submitted successfully:", data);
      // Optionally reset the form or show a success message
    } catch (error) {
      console.error("Error submitting agent:", error);
    }
    console.log("Sanitized payload:", payload);
  };

  return (
    <form className="agent-form" onSubmit={handleSubmit}>
      <h2>Create Agent</h2>

      {/* basic fields */}
      <div className="form-group">
        <label>Agent Name</label>
        <input
          value={form.agentName}
          onChange={(e) => setField("agentName", e.target.value)}
          type="text"
        />
      </div>

      <div className="form-group">
        <label>Agent Key (slug)</label>
        <input
          value={form.category}
          onChange={(e) => setField("category", e.target.value)}
          type="text"
          placeholder="will be replaced by category dropdown"
          style={{ display: "none" }}
        />
        {/* Category dropdown visible */}
        <label>Category</label>
        <select
          value={form.category}
          onChange={(e) => setField("category", e.target.value)}
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.categoryKey} value={c.categoryKey}>
              {c.categoryName}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Logo URL</label>
        <input
          value={form.logo}
          onChange={(e) => setField("logo", e.target.value)}
          type="url"
        />
      </div>

      <div className="form-group">
        <label>Tagline</label>
        <input
          value={form.tagline}
          onChange={(e) => setField("tagline", e.target.value)}
          type="text"
        />
      </div>

      <div className="form-group">
        <label>Short Description</label>
        <textarea
          value={form.shortDescription}
          onChange={(e) => setField("shortDescription", e.target.value)}
        />
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            checked={form.affiliatedOrNot}
            onChange={(e) => setField("affiliatedOrNot", e.target.checked)}
          />
          Affiliated
        </label>
        <label>
          <input
            type="checkbox"
            checked={form.openSource}
            onChange={(e) => setField("openSource", e.target.checked)}
          />
          Open Source
        </label>
      </div>

      <div className="form-group">
        <label>Agent Link</label>
        <input
          value={form.agentLink}
          onChange={(e) => setField("agentLink", e.target.value)}
          type="url"
        />
      </div>

      <div className="form-group">
        <label>Subscription Type</label>
        <select
          value={form.subscriptionType}
          onChange={(e) => setField("subscriptionType", e.target.value)}
        >
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>
      </div>

      <div className="form-group">
        <label>Overview</label>
        <textarea
          value={form.overview}
          onChange={(e) => setField("overview", e.target.value)}
        />
      </div>

      {/* other links */}
      <div className="nested-section">
        <h3>Other Links</h3>
        {form.otherLinks.map((link, i) => (
          <div key={i} className="nested-group">
            <input
              placeholder="Title"
              type="text"
              value={link.title}
              onChange={(e) => updateOtherLink(i, "title", e.target.value)}
            />
            <input
              placeholder="URL"
              type="url"
              value={link.url}
              onChange={(e) => updateOtherLink(i, "url", e.target.value)}
            />
            <button
              type="button"
              className="remove-btn"
              onClick={() => removeOtherLink(i)}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" className="add-btn" onClick={addOtherLink}>
          + Add Link
        </button>
      </div>

      {/* otherInformation (nested sections with content and subDescriptions) */}
      <div className="nested-section">
        <h3>Other Information</h3>

        {form.otherInformation.map((section, sIdx) => (
          <div key={sIdx} style={{ marginBottom: 18 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
              }}
            >
              <input
                placeholder="Section title (e.g. Key Takeaways)"
                type="text"
                value={section.title}
                onChange={(e) => updateSectionTitle(sIdx, e.target.value)}
              />
              <button
                type="button"
                className="remove-btn"
                onClick={() => removeSection(sIdx)}
              >
                Remove Section
              </button>
            </div>

            <div style={{ marginTop: 12 }}>
              {section.content.map((content, cIdx) => (
                <div
                  key={cIdx}
                  className="nested-group"
                  style={{ alignItems: "flex-start" }}
                >
                  <div style={{ flex: 1 }}>
                    <input
                      placeholder="Sub heading"
                      type="text"
                      value={content.subHeading}
                      onChange={(e) =>
                        updateContentHeading(sIdx, cIdx, e.target.value)
                      }
                    />

                    <div style={{ marginTop: 8 }}>
                      {content.subDescription.map((desc, dIdx) => (
                        <div
                          key={dIdx}
                          style={{ display: "flex", gap: 8, marginBottom: 8 }}
                        >
                          <input
                            placeholder="Sub description / bullet"
                            type="text"
                            value={desc}
                            onChange={(e) =>
                              updateSubDescription(
                                sIdx,
                                cIdx,
                                dIdx,
                                e.target.value
                              )
                            }
                          />
                          <button
                            type="button"
                            className="remove-btn"
                            onClick={() =>
                              removeSubDescription(sIdx, cIdx, dIdx)
                            }
                          >
                            ✕
                          </button>
                        </div>
                      ))}

                      <button
                        type="button"
                        className="add-btn"
                        onClick={() => addSubDescription(sIdx, cIdx)}
                      >
                        + Add Subpoint
                      </button>
                    </div>
                  </div>

                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 8 }}
                  >
                    <button
                      type="button"
                      className="add-btn"
                      onClick={() => addContentItem(sIdx)}
                    >
                      + Add Content
                    </button>
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeContentItem(sIdx, cIdx)}
                    >
                      Remove Content
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <button type="button" className="add-btn" onClick={addSection}>
          + Add Section
        </button>
      </div>

      {/* running / installation commands */}
      <div className="nested-section">
        <h3>Running Commands</h3>
        {form.runningCommands.map((c, i) => (
          <div key={i} className="nested-group">
            <input
              type="text"
              value={c}
              onChange={(e) =>
                updateArrayField("runningCommands", i, e.target.value)
              }
            />
            <button
              type="button"
              className="remove-btn"
              onClick={() => removeFromArrayField("runningCommands", i)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="add-btn"
          onClick={() => addToArrayField("runningCommands")}
        >
          + Add Command
        </button>
      </div>

      <div className="nested-section">
        <h3>Installation Commands</h3>
        {form.installationCommands.map((c, i) => (
          <div key={i} className="nested-group">
            <input
              type="text"
              value={c}
              onChange={(e) =>
                updateArrayField("installationCommands", i, e.target.value)
              }
            />
            <button
              type="button"
              className="remove-btn"
              onClick={() => removeFromArrayField("installationCommands", i)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="add-btn"
          onClick={() => addToArrayField("installationCommands")}
        >
          + Add Command
        </button>
      </div>

      {/* tags */}
      <div className="form-group">
        <label>Tags</label>
        <div className="chip-list">
          {form.tags.map((t, i) => (
            <div className="chip" key={i}>
              <input
                type="text"
                value={t}
                onChange={(e) => updateArrayField("tags", i, e.target.value)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "inherit",
                  outline: "none",
                  minWidth: 60,
                }}
              />
              <button
                type="button"
                onClick={() => removeFromArrayField("tags", i)}
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            className="add-btn"
            onClick={() => addToArrayField("tags")}
          >
            + Add Tag
          </button>
        </div>
      </div>

      <button type="submit" className="submit-btn">
        Create Agent
      </button>
    </form>
  );
}
