// Define the styles for the button (used for both enabled and disabled states)
const baseStyle = "display: inline-block; color: white; padding: 8px 12px; text-align: center; border-radius: 5px; text-decoration: none;";
const enabledStyle = "background-color: #f15725; cursor: pointer;";
const disabledStyle = "background-color: #a0a0a0; cursor: not-allowed;"; // Greyed out for disabled
const buttonText = "View Lineage in Alex";
const navigationUrl = "https://reltio-alex.alex4im.com/explore/table#/?action=multiEndToEnd&selectAll=true&exceedsMax=false&query=BUS_NAME%3D~'Customer%20Entity'&dls=true"

const mainHtml = `<div id="alex-buttons">
    <h3>Asset Lineage</h3>
    <a href="${navigationUrl}" target="_blank" style="display: inline-block; color: white; padding: 8px 12px; text-align: center; border-radius: 5px; background-color: #f15725; cursor: pointer;text-decoration: none;">
    View Lineage in Alex
    </a>
    <a id="preview-lineage" ui-actions='click' style="display: inline-block; color: white; padding: 8px 12px; text-align: center; border-radius: 5px; background-color: #f15725; cursor: pointer;text-decoration: none;">
    Preview Lineage in Reltio
    </a>
    </div>`

UI.getEntity().then(entity => {
  // Safely get the URL using optional chaining
  let html = `<div id="alex">
    ${mainHtml}
  </div>`

  // Render the appropriate HTML
  UI.setHtml(html);

}).catch(error => {
  // ERROR: Render a disabled button if getEntity fails
  console.error("Failed to get entity:", error);
  const html = `<div style="${baseStyle} ${disabledStyle}">
                    ${buttonText}
                  </div>`;

  UI.setHtml(html);
});

UI.onEvent((eventType, data) => {
    //listening for an event
    if(eventType === "uiAction" && data.type === "click") {
        if (data.id === "preview-lineage"){ 
            console.log("Preview Lineage button clicked");

            let html = `<div id="alex">
              ${mainHtml}
              <br>
  <div id="lineage-content">
    <h3>Comprehensive Lineage Summary: Customer Entity</h3>
    <p><strong>UID:</strong> reltio_Customer_Entity</p>

    <h4>🔍 1. Overview</h4>
    <p>The Customer Entity is the central master data hub responsible for creating a single, unified "golden record" for every customer. It is formally registered as a Reltio Entity and is the core component of the Master Data Management application.</p>
    <p><strong>📌 Why it matters:</strong> This asset eliminates data silos and ensures that all downstream analytics are based on consistent, accurate, and de-duplicated customer information, providing a single source of truth for the entire organization.</p>

    <h4>📥 2. Data Origin</h4>
    <p>The Customer Entity is sourced from the company's core operational and CRM platforms to build a complete customer profile. It receives a DATA_FLOW of cleansed transactional data from an Informatica ETL process (ETL_Customer_Data), which originates from a SQL Server Table. It also receives a DATA_FLOW directly from the Salesforce Account object.</p>
    <p><strong>📌 Why it matters:</strong> By combining transactional data (from SQL Server) with relationship data (from Salesforce), this entity creates a true 360-degree view of the customer.</p>

    <h4>🔄 3. Transformations</h4>
    <p>Within the Reltio MDM platform, raw data is transformed into a trusted master record. The logic involves matching, merging, and survivorship rules to consolidate attributes from all sources. For example, FirstName and LastName from the ETL process are combined into a single FullName attribute.</p>
    <p><strong>📌 Why it matters:</strong> This mastering process is critical for data quality. It ensures that a customer represented differently in various systems is resolved into one identity, preventing flawed analytics and improving operational efficiency.</p>

    <h4>📊 4. Downstream Usage</h4>
    <p>The mastered data from the Customer Entity is the foundational source for all enterprise-level analytics. It sends a DATA_FLOW to the snowflake_DIM_CUSTOMER table, which serves as the primary customer dimension in the Data Warehouse. This Snowflake table then populates the powerbi_Customer_Dataset, which in turn is consumed by the Customer_Sales_Dashboard.</p>
    <p><strong>📌 Why it matters:</strong> The accuracy of this single asset directly impacts the reliability of the corporate data warehouse and all executive-level BI reporting that depends on it.</p>
    
    <h4>⚠️ 5. Business Risks & Alerts</h4>
    <ul>
      <li>⚠️ <strong>Risk of Mismatches:</strong> Incorrect match-and-merge logic could lead to consolidating two different customers or failing to merge duplicate records.</li>
      <li>🔐 <strong>PII Classification:</strong> As the master source, this entity contains a highly concentrated set of Personally Identifiable Information (PII) and is subject to the strictest data privacy policies.</li>
      <li>⛔ <strong>Impact of Error:</strong> Any error in a master record will propagate to all downstream systems, critically affecting sales, marketing, and financial reporting./li>
    </ul>
    <p><strong>📌 Recommended Action:</strong> Regularly monitor match/merge statistics in the Reltio dashboard and review potential matches flagged by the system.</p>
  </div>
            </div>`

            UI.setHtml(html)
        }
    }
});
