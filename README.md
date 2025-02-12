# docVault
# 📂 DocVault: A Secure Digital Document Management Solution  

## 📌 Overview  
DocVault is a secure and user-friendly digital document management solution designed for individuals, families, and businesses. It centralizes critical files like IDs, financial statements, contracts, and medical records, ensuring secure storage, efficient organization, and easy accessibility.  

The core feature of DocVault is a **Chrome extension** that categorizes and stores downloaded documents automatically using content and metadata analysis. Additionally, it integrates **AWS Textract for text extraction, AWS Translate for document translation, and AI-driven guidance** for form completion and document-related queries.  

## ✨ Features  
- **Chrome Extension**: Automatically categorizes and stores documents upon download.  
- **AWS Textract**: Extracts text from documents for content analysis.  
- **Automatic Categorization**: Organizes documents into relevant folders (Financial, Legal, Personal, etc.).  
- **AWS Translate Integration**: Translates non-English documents into English.  
- **AI Chatbot**: Answers document-related queries and assists with form completion.  
- **Secure Cloud Storage**: Documents stored safely in **Amazon S3** with easy retrieval.  

---

## 🛠 Minimum Viable Product (MVP)  

### **Chrome Extension**  
✅ Detects when a document is downloaded.  
✅ Extracts content and categorizes it automatically using predefined patterns (e.g., "Invoice", "Driver's License").  

### **Backend System**  
✅ Secure document storage in **AWS S3**.  
✅ **AWS Textract** for extracting text and categorizing documents.  
✅ Metadata storage using **AWS DynamoDB**.  

### **Document Translation**  
✅ Uses **AWS Translate** to translate non-English documents and store them appropriately.  

### **AI Integration**  
✅ AI chatbot answers questions related to stored/downloaded documents (e.g., *"When does my passport expire?"*).  
✅ Assists users in filling out forms.  

### **Web Interface**  
✅ Allows users to **log in, view, search, and manage** stored documents.  

---

## 🚀 Stretch Goals  
💡 **Advanced Document Classification**: Machine learning-based classification for improved accuracy.  
💡 **Secure Document Sharing**: Role-based access control for sharing documents.  
💡 **OCR for Scanned Documents**: Extract text from scanned PDFs/images.  
💡 **Cross-Browser Support**: Extend the extension to Firefox and Safari.  
💡 **Mobile App**: **React Native** or **Flutter** app for on-the-go document management.  
💡 **Document Annotation**: Enable users to annotate and comment on stored documents.  

---

## 📅 Milestones  

| **Week** | **Tasks** |
|----------|----------|
| **1-2**  | Project planning, repo setup, finalize tech stack. |
| **3-4**  | Develop Chrome extension, integrate with AWS S3, implement initial categorization. |
| **5-6**  | Build backend (API Gateway, Lambda, DynamoDB), authentication, UI setup. |
| **7-8**  | Implement AI chatbot, improve categorization, add AWS Translate. |
| **9**    | Unit testing, integration testing, user testing. |
| **10**   | Final refinements, bug fixes, documentation. |

---

## 🏗 Tech Stack  

### **Frontend**  
- **Next.js** – Web interface for document management.  
- **Chrome Extension API** – Handles document downloads.  

### **Backend**  
- **AWS API Gateway** – API handling.  
- **AWS S3** – Secure storage for categorized documents.  
- **AWS Lambda** – Handles document processing.  
- **AWS Textract** – Extracts text for document categorization.  
- **AWS Translate** – Translates documents into English.  
- **AWS DynamoDB** – Stores document metadata.  

### **Authentication**  
- **Amazon Cognito** – User authentication and authorization.  

---

## 🏆 Competition  
| **Competitor** | **Challenges** |
|---------------|---------------|
| **Google Drive/OneDrive** | Requires manual document organization. |
| **DocuSign** | No automatic document categorization. |
| **Evernote/Notion** | Lacks AI-powered document management. |

✅ **DocVault Advantage**: Automation, AI assistance, secure cloud storage.  

---

## 🚧 Challenges & Solutions  

🚨 **Many features to complete in 10 weeks** → Break tasks into small components and refine iteratively.  
🚨 **Beginners unfamiliar with AI integration** → Start researching early, integrate AI after core components.  
🚨 **Handling both extension & web app** → Keep UI simple and intuitive.  

---

## 📚 Additional Resources  

### **Chrome Extension Development**  
- [How to Create a Chrome Extension with React + Tailwind CSS](https://example.com)  
- [ReactJS Chrome Extension Guide](https://example.com)  
- [Next.js 14 Tutorial](https://example.com)  

### **AWS Services**  
- [AWS S3 Basics](https://example.com)  
- [AWS Textract & Translate Docs](https://example.com)  

### **Development Tools**  
- **GitHub Docs**  
- **Visual Studio Code**  
- **Postman**  

## Developers 👥
- Aima Salman
- Noah Flores
- Nicholas Remack
- Sreenivasa Sobhirala

## Project Team
- **Nadeeba Atiqui** - Project Manager
- **Joanna Borba** - Industry Mentor

---
### 🚀 Get Started with DocVault Development
Clone the repository and follow the setup instructions to contribute!
```bash
  git clone https://github.com/your-repo/docvault.git
  cd docvault
  npm install
  npm run dev
