import { mkdirSync, writeFileSync, appendFileSync, existsSync} from 'fs';
import { Conversation, Inbox, Message, Comment, Attachment } from './types';
import { parse } from 'json2csv';

// Customer-defined handlers for loading the exported resources into their system

export function exportInbox(path: string, inbox : Inbox) : boolean {
    try {
        mkdirSync(path, {recursive: true});
        return true;
    } catch {
        return false;
    }
}

// instantiate an empty list to collect conversations
const conversationsListData: Conversation[] = [];

// function to add a conversation to the list
export function collectConversation(conversation: Conversation): void {
    conversationsListData.push(conversation);
}

// define the csv headers to get rid of blank columns
const csvHeaders = [
    'conv_id',
    'subject',
    'status',
    'assignee_id',
    'assignee_email',
    'assignee_username',
    'recipient',
    'tags',
    'front_link_id',
    'top_external_url',
    'deal_id',
    'created_at',
    '_extracted_at'
];

// function to export conversations to a CSV file
export function exportToCSV(filePath: string): void {
    try {
        const csv = parse(conversationsListData, { fields: csvHeaders });  // converts json
        writeFileSync(filePath, csv);          // write csv data to file
        console.log(`Exported ${conversationsListData.length} conversations to ${filePath}`);
    } catch (error) {
        console.error('Error exporting to CSV:', error);
    }
}

// Exports a single conversation to a JSON file
export function exportConversation(path: string, conversation : Conversation) : boolean {
    try {
        // creates a directory for a conversation's messages
        mkdirSync(path, {recursive: true}); 

        // write the conversation details to a file in that same directory
        writeFileSync(`${path}/${conversation.id}.json`, JSON.stringify(conversation))
        return true;
    } catch {
        return false;
    }
}

export function exportMessage(path: string, message : Message) : boolean {
    try {
        writeFileSync(path, JSON.stringify(message));
        return true;
    } catch {
        return false;
    }
}

export function exportComment(path: string, comment : Comment) : boolean {
    try {
        writeFileSync(path, JSON.stringify(comment));
        return true;
    } catch {
        return false;
    }
}

export function exportAttachment(path: string, attachment : Attachment, buffer : Buffer) : boolean {
    try {
        // creates a directory for a messages's attachments
        mkdirSync(path, {recursive: true}); 

        writeFileSync(`${path}/${attachment.filename}`, buffer);
        return true;
    } catch {
        return false;
    }
}