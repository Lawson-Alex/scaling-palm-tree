// Define the styles for the button (used for both enabled and disabled states)
const baseStyle = "display: inline-block; color: white; padding: 8px 12px; text-align: center; border-radius: 5px; text-decoration: none;";
const enabledStyle = "background-color: #f15725; cursor: pointer;";
const disabledStyle = "background-color: #a0a0a0; cursor: not-allowed;"; // Greyed out for disabled
const buttonText = "View Lineage in Alex";
const navigationUrl = "https://reltio-alex.alex4im.com/explore/table#/?action=multiEndToEnd&selectAll=true&exceedsMax=false&query=BUS_NAME%3D~'Customer%20Entity'&dls=true"

UI.getEntity().then(entity => {
  // Safely get the URL using optional chaining
  let html = `<div id="alex">
    <div id="alex-buttons">
    <h3>Asset Lineage</h3>
    <a href="${navigationUrl}" target="_blank" style="display: inline-block; color: white; padding: 8px 12px; text-align: center; border-radius: 5px; background-color: #f15725; cursor: pointer;text-decoration: none;">
    View Lineage in Alex
    </a>
    <a id="preview-lineage" ui-actions='click' style="display: inline-block; color: white; padding: 8px 12px; text-align: center; border-radius: 5px; background-color: #f15725; cursor: pointer;text-decoration: none;">
    Preview Lineage in Reltio
    </a>
    </div>
    <br>
    <div id="lineage-content">
    </div>
  </div>`

  // Render the appropriate HTML
  UI.setHeight(34);
  UI.setHtml(html);

}).catch(error => {
  // ERROR: Render a disabled button if getEntity fails
  console.error("Failed to get entity:", error);
  const html = `<div style="${baseStyle} ${disabledStyle}">
                    ${buttonText}
                  </div>`;

  UI.setHeight(34);
  UI.setHtml(html);
});

UI.onEvent((eventType, data) => {
    //listening for an event
    if(eventType === "uiAction" && data.type === "click") {
        if (data.id === "preview-lineage"){ 
            console.log("Preview Lineage button clicked");
        }
    }
});
