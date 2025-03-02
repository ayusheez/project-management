
import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, FileUp, Users, Paperclip, FileText, FileImage } from "lucide-react";
import { toast } from "sonner";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

// Mock data for chat messages
const mockChatMessages = [
  {
    id: "1",
    author: { name: "John Smith", avatar: "/placeholder.svg" },
    content: "Hey team, I've just pushed the new design changes. Let me know what you think!",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    author: { name: "Sarah Johnson", avatar: "/placeholder.svg" },
    content: "Looks great! I especially like the new color scheme.",
    timestamp: "10:35 AM",
  },
  {
    id: "3",
    author: { name: "Michael Brown", avatar: "/placeholder.svg" },
    content: "I'll start implementing the responsive layout today.",
    timestamp: "10:40 AM",
  },
  {
    id: "4",
    author: { name: "Emma Wilson", avatar: "/placeholder.svg" },
    content: "Can we discuss the navigation structure in today's meeting?",
    timestamp: "10:45 AM",
    attachment: { type: "document", name: "navigation-structure.pdf", size: "2.3 MB" },
  },
];

// Mock data for task comments
const mockTaskComments = [
  {
    id: "1",
    taskId: "task-1",
    task: "Design homepage wireframe",
    comments: [
      {
        id: "1",
        author: { name: "Sarah Johnson", avatar: "/placeholder.svg" },
        content: "I've finished the initial wireframe. Please review when you have a chance.",
        timestamp: "Yesterday, 4:30 PM",
        attachment: { type: "image", name: "wireframe-v1.png", size: "1.5 MB" },
      },
      {
        id: "2",
        author: { name: "John Smith", avatar: "/placeholder.svg" },
        content: "Looks good! Can we add a call-to-action button in the hero section?",
        timestamp: "Today, 9:15 AM",
      },
    ],
  },
  {
    id: "2",
    taskId: "task-2",
    task: "Implement responsive navigation",
    comments: [
      {
        id: "1",
        author: { name: "Michael Brown", avatar: "/placeholder.svg" },
        content: "I'm having some issues with the mobile menu. Can someone help?",
        timestamp: "Today, 11:30 AM",
      },
    ],
  },
  {
    id: "3",
    taskId: "task-3",
    task: "Create content management system",
    comments: [
      {
        id: "1",
        author: { name: "Emma Wilson", avatar: "/placeholder.svg" },
        content: "Database schema is ready. Here's the documentation.",
        timestamp: "Today, 10:20 AM",
        attachment: { type: "document", name: "db-schema.pdf", size: "3.2 MB" },
      },
    ],
  },
];

// Current user for sending messages/comments
const currentUser = {
  name: "John Smith",
  avatar: "/placeholder.svg",
};

export default function Collaboration() {
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("chat");
  const [selectedTask, setSelectedTask] = useState(mockTaskComments[0].taskId);
  const [comment, setComment] = useState("");
  const [chatMessages, setChatMessages] = useState(mockChatMessages);
  const [taskComments, setTaskComments] = useState(mockTaskComments);
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add new message to state
    const newMessage = {
      id: (chatMessages.length + 1).toString(),
      author: currentUser,
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages([...chatMessages, newMessage]);
    setMessage("");
    
    // Show success toast
    toast({
      title: "Message sent",
      description: "Your message has been sent to the team.",
    });
  };

  const handleAddComment = () => {
    if (!comment.trim()) return;

    // Find the task in the task comments
    const updatedTaskComments = taskComments.map((task) => {
      if (task.taskId === selectedTask) {
        const newComment = {
          id: (task.comments.length + 1).toString(),
          author: currentUser,
          content: comment,
          timestamp: "Just now",
        };
        return {
          ...task,
          comments: [...task.comments, newComment],
        };
      }
      return task;
    });

    setTaskComments(updatedTaskComments);
    setComment("");
    
    // Show success toast
    toast({
      title: "Comment added",
      description: "Your comment has been added to the task.",
    });
  };

  const handleFileUpload = (context: "chat" | "comment") => {
    // In a real app, this would handle file uploads
    // For now, just show a toast message
    toast({
      title: "File uploaded",
      description: `Your file has been uploaded to the ${context === "chat" ? "chat" : "task comment"}.`,
    });
  };

  const getTaskById = (taskId: string) => {
    return taskComments.find((task) => task.taskId === taskId);
  };

  const selectedTaskComments = getTaskById(selectedTask)?.comments || [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Team Collaboration</h1>
          <p className="text-muted-foreground mt-2">Communicate with your team and discuss project tasks</p>
        </div>

        <Tabs defaultValue="chat" onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Team Chat
            </TabsTrigger>
            <TabsTrigger value="comments" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Task Comments
            </TabsTrigger>
          </TabsList>

          {/* Chat Tab Content */}
          <TabsContent value="chat" className="space-y-4">
            <Card className="overflow-hidden">
              <CardHeader className="bg-accent/50 pb-3">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Team Chat
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {/* Messages container */}
                <div className="h-[500px] flex flex-col">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {chatMessages.map((msg) => (
                      <div 
                        key={msg.id} 
                        className={`flex gap-3 ${msg.author.name === currentUser.name ? 'justify-end' : ''}`}
                      >
                        {msg.author.name !== currentUser.name && (
                          <Avatar className="h-8 w-8 flex-shrink-0">
                            <AvatarImage src={msg.author.avatar} alt={msg.author.name} />
                            <AvatarFallback>
                              {msg.author.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className={`flex flex-col ${msg.author.name === currentUser.name ? 'items-end' : 'items-start'}`}>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">
                              {msg.author.name === currentUser.name ? 'You' : msg.author.name}
                            </span>
                            <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                          </div>
                          <div className={`mt-1 rounded-lg px-3 py-2 text-sm ${
                            msg.author.name === currentUser.name 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-accent'
                          }`}>
                            {msg.content}
                          </div>
                          {msg.attachment && (
                            <div className="mt-2 flex items-center gap-2 rounded-lg bg-accent/50 px-3 py-2 text-sm">
                              {msg.attachment.type === 'document' ? (
                                <FileText className="h-4 w-4 text-blue-500" />
                              ) : (
                                <FileImage className="h-4 w-4 text-green-500" />
                              )}
                              <span>{msg.attachment.name}</span>
                              <span className="text-xs text-muted-foreground">({msg.attachment.size})</span>
                            </div>
                          )}
                        </div>
                        {msg.author.name === currentUser.name && (
                          <Avatar className="h-8 w-8 flex-shrink-0">
                            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                            <AvatarFallback>
                              {currentUser.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="border-t p-4">
                    <div className="flex gap-2">
                      <Textarea
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="min-h-[60px]"
                      />
                      <div className="flex flex-col gap-2">
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button variant="outline" size="icon" title="Attach file">
                              <Paperclip className="h-4 w-4" />
                            </Button>
                          </SheetTrigger>
                          <SheetContent>
                            <SheetHeader>
                              <SheetTitle>Upload File</SheetTitle>
                              <SheetDescription>
                                Attach a file to your message. Supported formats: PDF, DOC, JPG, PNG.
                              </SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-4 py-4">
                              <div className="border-2 border-dashed rounded-lg p-12 text-center">
                                <FileUp className="h-12 w-12 mx-auto text-muted-foreground" />
                                <p className="mt-2 text-sm font-medium">
                                  Drag and drop your file here, or click to browse
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                  Maximum file size: 10MB
                                </p>
                                <Button 
                                  className="mt-4" 
                                  variant="outline"
                                  onClick={() => handleFileUpload("chat")}
                                >
                                  Browse Files
                                </Button>
                              </div>
                            </div>
                          </SheetContent>
                        </Sheet>
                        <Button onClick={handleSendMessage} disabled={!message.trim()}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Task Comments Tab Content */}
          <TabsContent value="comments" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="md:col-span-1">
                <CardHeader className="bg-accent/50 pb-3">
                  <CardTitle className="text-lg">Tasks</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {taskComments.map((task) => (
                      <div 
                        key={task.taskId} 
                        className={`p-3 cursor-pointer hover:bg-accent/50 transition-colors ${
                          selectedTask === task.taskId ? 'bg-accent' : ''
                        }`}
                        onClick={() => setSelectedTask(task.taskId)}
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{task.task}</p>
                          <Badge variant="outline">{task.comments.length}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader className="bg-accent/50 pb-3">
                  <CardTitle className="text-lg">
                    {getTaskById(selectedTask)?.task || "Select a task"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[400px] flex flex-col">
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {selectedTaskComments.length > 0 ? (
                        selectedTaskComments.map((comment) => (
                          <div key={comment.id} className="flex gap-3">
                            <Avatar className="h-8 w-8 flex-shrink-0">
                              <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                              <AvatarFallback>
                                {comment.author.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">
                                  {comment.author.name === currentUser.name ? 'You' : comment.author.name}
                                </span>
                                <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                              </div>
                              <div className="mt-1 text-sm">{comment.content}</div>
                              {comment.attachment && (
                                <div className="mt-2 flex items-center gap-2 rounded-lg bg-accent/50 px-3 py-2 text-sm">
                                  {comment.attachment.type === 'document' ? (
                                    <FileText className="h-4 w-4 text-blue-500" />
                                  ) : (
                                    <FileImage className="h-4 w-4 text-green-500" />
                                  )}
                                  <span>{comment.attachment.name}</span>
                                  <span className="text-xs text-muted-foreground">({comment.attachment.size})</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                          No comments yet. Be the first to comment!
                        </div>
                      )}
                    </div>
                    <div className="border-t p-4">
                      <div className="flex gap-2">
                        <Textarea
                          placeholder="Add a comment..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="min-h-[60px]"
                        />
                        <div className="flex flex-col gap-2">
                          <Sheet>
                            <SheetTrigger asChild>
                              <Button variant="outline" size="icon" title="Attach file">
                                <Paperclip className="h-4 w-4" />
                              </Button>
                            </SheetTrigger>
                            <SheetContent>
                              <SheetHeader>
                                <SheetTitle>Upload File</SheetTitle>
                                <SheetDescription>
                                  Attach a file to your comment. Supported formats: PDF, DOC, JPG, PNG.
                                </SheetDescription>
                              </SheetHeader>
                              <div className="grid gap-4 py-4">
                                <div className="border-2 border-dashed rounded-lg p-12 text-center">
                                  <FileUp className="h-12 w-12 mx-auto text-muted-foreground" />
                                  <p className="mt-2 text-sm font-medium">
                                    Drag and drop your file here, or click to browse
                                  </p>
                                  <p className="mt-1 text-xs text-muted-foreground">
                                    Maximum file size: 10MB
                                  </p>
                                  <Button 
                                    className="mt-4" 
                                    variant="outline"
                                    onClick={() => handleFileUpload("comment")}
                                  >
                                    Browse Files
                                  </Button>
                                </div>
                              </div>
                            </SheetContent>
                          </Sheet>
                          <Button onClick={handleAddComment} disabled={!comment.trim()}>
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
