# 📑 Project Architecture Document: Free Cloud Stack
**Project:** Insurance Management System (Node.js Backend)  
**Cost:** $0.00 / month (100% Free Tiers)

## 1. Executive Summary
This document outlines the cloud infrastructure for the Insurance Management System. Instead of paying for an expensive all-in-one platform, this design splits the data into two highly optimized, free-tier cloud services. 

By keeping the Node.js backend server "stateless," we eliminate the need for expensive persistent server disks. Text data goes to a serverless relational database, while heavy documents go to a global object storage network.

---

## 2. Infrastructure Components

### 🧠 The Brain: Neon (Serverless PostgreSQL)
*   **Purpose:** Stores all structured data, user profiles, financial numbers, and relationships.
*   **Free Tier Allocation:** 500 MB of storage space.
*   **Why it fits Insurance:** PostgreSQL ensures strict data accuracy. It links users, policies, and claims together perfectly using foreign keys so records never get lost or corrupted.

### 🗄️ The Filing Cabinet: Cloudflare R2 (Object Storage)
*   **Purpose:** Stores all uploaded physical files (PDF contracts, scanned IDs, accident photos).
*   **Free Tier Allocation:** 10 GB of total storage per month.
*   **Why it fits Insurance:** Standard cloud storage charges you money every time an insurance agent or client downloads a document to view it. Cloudflare R2 has **zero egress fees**, meaning downloading and viewing files is 100% free forever.

---

## 3. How Data Flows (The Architecture)

When a user interacts with your system, the data splits automatically in the background:

                [ Client / Web Browser ]
                            │
            Sends Data & Files via HTTPS Request
                            │
                            ▼
                [ Node.js Backend Server ]
                /                      \
                /                        \
        (1) Uploads File          (2) Saves Text Data
                /                            \
            ▼                              ▼
    [ Cloudflare R2 ]               [ Neon Postgres ]
    (Stores: document.pdf)          (Stores: Text & URL Link)


### Step-by-Step Breakdown:
1.  **The Upload:** An insurance agent uploads a new claim form (`accident_report.pdf`) through the web app.
2.  **File Storage:** The Node.js server streams the physical `.pdf` file directly to **Cloudflare R2**. 
3.  **The Link:** Cloudflare saves the file and returns a unique, permanent web link text string (e.g., `https://myinsurance.com`).
4.  **Database Save:** The Node.js server takes that text link along with the claim text (e.g., Claim Amount: $5,000) and saves it into **Neon PostgreSQL**. The heavy file never touches the database.

---

## 4. Why This Setup Protects The System

*   **Financial Integrity:** PostgreSQL treats currency and balances safely using the `DECIMAL` data type. It prevents the rounding bugs common in NoSQL databases.
*   **Ultimate Scalability:** Because the file storage and database are separated, your database stays tiny, lean, and incredibly fast. It only has to read text strings, not heavy binary file data.
*   **Zero Dollar Cost:** This combo effortlessly handles the traffic and file storage needs of a launching application with thousands of rows of data without costing a single penny.

---

## 5. Summary Table

| Service | Feature | Free Limit | What it Stores in Your App |
| :--- | :--- | :--- | :--- |
| **Neon** | Relational Database | **500 MB** | User accounts, insurance policies, claim logs, file URLs. |
| **Cloudflare R2** | Object File Storage | **10 GB** | Actual PDF contracts, image uploads, agent documents. |
