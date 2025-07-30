//define button
var html =
"<div id='test-button' ui-actions='click'>\n" +
"   Execute\n" +
"</div>";
UI.setHeight(34);
UI.setHtml(html);
UI.onEvent((eventType, data) => {
    //listening for an event
    if(eventType === "uiAction" && data.type === "click") {
        if (data.id === "test-button"){ 
            //sending the request
            console.log("Button clicked: " + data)
        }
    }
});