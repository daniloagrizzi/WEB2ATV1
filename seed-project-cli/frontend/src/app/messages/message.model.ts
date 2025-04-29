export class Message{
    messageId?: string;
    content: string;
    userId?: string;
    username: string;
    userImageUrl?: string

    constructor(content: string,username: string, messageId?: string, userImageUrl?: string ,userId?: string){
        this.messageId = messageId;
        this.content = content;
        this.userId = userId;
        this.username = username;
        this.userImageUrl = userImageUrl;
    
    }
}