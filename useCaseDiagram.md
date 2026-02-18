# Use Case Diagram

---
### 📑 Navigation
[Idea](idea.md) | [Use Case](useCaseDiagram.md) | [Sequence](sequenceDiagram.md) | [Class Diagram](classDiagram.md) | [ER Diagram](ErDiagram.md)
---

```mermaid
useCaseDiagram
    actor "Customer" as User
    actor "AI Stylist" as AI
    actor "Administrator" as Admin

    package "AI Personal Shopper Store" {
        usecase "Create Style Profile" as UC1
        usecase "Chat with AI Stylist" as UC2
        usecase "Get Personalized Recommendations" as UC3
        usecase "Browse/Search Products" as UC4
        usecase "Add to Cart & Checkout" as UC5
        usecase "View Order History" as UC6
        usecase "Manage Product Inventory" as UC7
        usecase "Analyze User Trends" as UC8
    }

    User --> UC1
    User --> UC2
    User --> UC4
    User --> UC5
    User --> UC6

    AI --> UC2
    AI --> UC3

    Admin --> UC7
    Admin --> UC8
    Admin --> UC4
```

## Details
The **Use Case Diagram** defines the boundaries of the AI Personal Shopper system. It identifies the external actors (Customer, AI Stylist, and Administrator) and the specific tasks they perform. This diagram ensures that all stakeholder requirements are mapped to system functionalities, ranging from the conversational AI interface to administrative inventory management. Key use cases include style profile creation, interactive chat, and AI-driven recommendations.
