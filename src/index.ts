import { FrontExport, ExportOptions } from "./export";
import { collectConversation, exportToCSV } from "./helpers";

const options : ExportOptions = {
    shouldIncludeMessages: false,
    shouldIncludeComments: false,
    shouldIncludeAttachments: false,
    customOutputFormatOneFile: true
}

// Export all conversations from all inboxes available to the API key
/*
FrontExport.listInboxes()
.then(inboxes => {
    for (const inbox of inboxes) {
        FrontExport.exportInboxConversations(inbox, options)
        .then(conversations => {
            console.log(conversations.length);
        });
    }
})
*/


// Set after timestamp to July 1, 2024
const after_ts = 1719810000

// if you want the output to collect all conversations in one csv, set this to true
const outputOneFile = true;


// Collect all conversations, after timestamp and save to csv
FrontExport.exportSearchConversations('', { after: after_ts }, [], options)
    .then(conversations => {
        if (outputOneFile) {
            // Collect and format each conversation
            conversations.forEach(conversation => collectConversation(conversation));
            exportToCSV('./export/conversations.csv'); // Export all collected data to a single CSV file
        } 
        else {
            console.log(conversations.length);
        }
    })
    .catch(error => {
        console.error("Error exporting conversations:", error);
    });


