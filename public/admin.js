fetch("/admin/leads")
  .then(res => res.json())
  .then(leads => {
    const tbody = document.querySelector("#leads-table tbody");

    leads.reverse().forEach(lead => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${lead.name || "-"}</td>
        <td>${lead.phone || "-"}</td>
        <td>${lead.background || "-"}</td>
        <td>${lead.interest || "-"}</td>
        <td>${lead.flowType || "-"}</td>
        <td>${new Date(lead.timestamp).toLocaleString()}</td>
      `;
      tbody.appendChild(row);
    });
  });
