//define button
var html =
"<div id='test-button' ui-actions='click' style='background-color: #f15725; color: white; padding: 8px 12px; text-align: center; border-radius: 5px; cursor: pointer;'>\n" +
"View Lineage in Alex\n" +
"</div>";
UI.setHeight(34);
UI.setHtml(html);
UI.onEvent((eventType, data) => {
    //listening for an event
    if(eventType === "uiAction" && data.type === "click") {
        if (data.id === "test-button"){ 
            // Redirect to Alex
            UI.getEntity().then(function(entity){
               console.log(JSON.stringify(entity))
            });
            // window.location.href = "";
        }
    }
});
