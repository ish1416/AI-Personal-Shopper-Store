# ER Diagram

---
### 📑 Navigation
[Idea](idea.md) | [Use Case](useCaseDiagram.md) | [Sequence](sequenceDiagram.md) | [Class Diagram](classDiagram.md) | [ER Diagram](ErDiagram.md)
---

```mermaid
erDiagram
    USERS ||--o| STYLE_PROFILES : "has"
    USERS ||--o{ ORDERS : "places"
    USERS ||--o{ CHAT_SESSIONS : "starts"
    
    ORDERS ||--|{ ORDER_ITEMS : "contains"
    PRODUCTS ||--o{ ORDER_ITEMS : "linked to"
    
    CHAT_SESSIONS ||--|{ CHAT_MESSAGES : "logs"

    USERS {
        uuid id PK
        string email
        string password_hash
        string full_name
        datetime created_at
    }

    STYLE_PROFILES {
        uuid id PK
        uuid user_id FK
        json preferences
        string size_details
        string aesthetic_type
    }

    PRODUCTS {
        uuid id PK
        string name
        text description
        decimal price
        int stock_quantity
        string[] tags
        vector embedding
    }

    ORDERS {
        uuid id PK
        uuid user_id FK
        decimal total_amount
        string status
        datetime ordered_at
    }

    ORDER_ITEMS {
        uuid id PK
        uuid order_id FK
        uuid product_id FK
        int quantity
        decimal unit_price
    }

    CHAT_SESSIONS {
        uuid id PK
        uuid user_id FK
        datetime started_at
    }

    CHAT_MESSAGES {
        uuid id PK
        uuid session_id FK
        string sender_type
        text message_content
        datetime sent_at
    }
```

## Details
The **Entity-Relationship (ER) Diagram** represents the persisted data layer of the AI Personal Shopper Store. It illustrates the tables (Entities) such as Users, Products, and Orders, along with their attributes and foreign key relationships. A key feature is the inclusion of a `vector embedding` in the Products table, which enables high-speed semantic search using AI models.
