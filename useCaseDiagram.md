# Use Case Diagram

---
### 📑 Navigation
[Idea](idea.md) | [Use Case](useCaseDiagram.md) | [Sequence](sequenceDiagram.md) | [Class Diagram](classDiagram.md) | [ER Diagram](ErDiagram.md)
---

## Visual Illustration
![Use Case Architecture](use_case_diagram_v2_1771439964954.png)

## System Boundaries & Interactions

```mermaid
graph TB
    subgraph "AI Personal Shopper Platform"
        UC1(Set Up Style Profile)
        UC2(Consult AI Stylist)
        UC3(Visual Search via Photo)
        UC4(Generate Matching Outfits)
        UC5(Manage Virtual Wardrobe)
        UC6(Purchase Items)
        UC7(Track Order Status)
        UC8(Manage Inventory)
        UC9(Curate AI Trends)
    end

    Customer((Customer))
    AI_Engine((AI GPT-4o Engine))
    StoreAdmin((Store Admin))

    %% Customer Interactions
    Customer --> UC1
    Customer --> UC2
    Customer --> UC3
    Customer --> UC4
    Customer --> UC5
    Customer --> UC6
    Customer --> UC7

    %% AI Engine Support
    AI_Engine -.-> UC2
    AI_Engine -.-> UC3
    AI_Engine -.-> UC4
    AI_Engine -.-> UC9

    %% Admin Interactions
    StoreAdmin --> UC8
    StoreAdmin --> UC9
```

## Details

| Use Case | Actor | Description |
| :--- | :--- | :--- |
| **Set Up Style Profile** | Customer | Users input measurements, favorite colors, and style preferences. |
| **Consult AI Stylist** | Customer, AI | Natural language chat to find products for specific occasions. |
| **Visual Search** | Customer, AI | Uploading a photo to find visually similar items in the store. |
| **Generate Outfits** | AI | Automatically suggesting items that pair well together. |
| **Manage Inventory** | Admin | Adding new products, updating stock levels, and managing tags. |

### Key Improvements
- **Multi-Actor Collaboration**: Highlights how the **AI Engine** works alongside the Customer to fulfill complex requests.
- **Admin Roles**: Clearly defines back-office tasks like inventory and trend curation.
- **Expanded Scope**: Now includes modern features like **Visual Search** and **Virtual Wardrobe management**.
