// Define the styles for the button (used for both enabled and disabled states)
const baseStyle = "display: inline-block; color: white; padding: 8px 12px; text-align: center; border-radius: 5px; text-decoration: none;";
const enabledStyle = "background-color: #f15725; cursor: pointer;";
const disabledStyle = "background-color: #a0a0a0; cursor: not-allowed;"; // Greyed out for disabled
const buttonText = "View Lineage in Alex";
const navigationUrl = "https://reltio-alex.alex4im.com/explore/table#/?action=multiEndToEnd&selectAll=true&exceedsMax=false&query=BUS_NAME%3D~'Customer%20Entity'&dls=true"

const mainHtml = `<div id="alex-buttons" style="padding: 8px 12px; border-radius: 5px;">
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
