// Define the styles for the button (used for both enabled and disabled states)
const baseStyle = "display: inline-block; color: white; padding: 8px 12px; text-align: center; border-radius: 5px;";
const enabledStyle = "background-color: #f15725; cursor: pointer;";
const disabledStyle = "background-color: #a0a0a0; cursor: not-allowed;"; // Greyed out for disabled
const buttonText = "View Lineage in Alex";

UI.getEntity().then(entity => {
    // Safely get the URL using optional chaining
    const navigationLink = entity?.attributes?.WebsiteURL?.[0]?.value;
    let html;

    UI.getUiConfiguration().then(function(jsonUiConfiguration){
      console.log("UI Configuration");
      console.log(JSON.stringify(jsonUiConfiguration));
    });

    UI.getConfiguration().then(function(jsonApiConfiguration){
       console.log("Configuration");
       console.log(JSON.stringify(jsonApiConfiguration));
    });

    

    if (navigationLink) {
        // URL FOUND: Create a real link (<a> tag) styled like a button
        console.log("Navigation Link found: " + navigationLink);
        html = `<a href="${navigationLink}" target="_blank" style="${baseStyle} ${enabledStyle}">
                  ${buttonText}
                </a>`;
    } else {
        // URL NOT FOUND: Create a non-clickable <div> styled as a disabled button
        console.warn("WebsiteURL attribute is missing or empty.");
        html = `<div style="${baseStyle} ${disabledStyle}">
                  ${buttonText}
                </div>`;
    }
    
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
