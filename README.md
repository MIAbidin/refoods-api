# ReFodd API

## Getting Started

To get started running the project locally, please follow the steps below.

First, clone the repository.

```bash
git clone https://github.com/MIAbidin/refoods-api.git
```

Then, install dependencies and fetch data to your local machine. **Note that we use NPM**

```bash
cd Refood-api
npm install
```

Finally, run the development.

```bash
npm run start
```

---

## How To Use It

**Base Url** :  `https://54.254.164.76:5000`

| Endpoint | Usage | Method | Description |
|----------|-------|---------|----------|
| `/refood/{idLimbah}` | Add Refood Processing | POST |  Add a new refood processing method for a specific waste ID. |
| `/refood` | Get All Refoods | GET |  Retrieve all refood processing data. |
| `/refood/{idLimbah}` | Get Refood by ID Limbah | GET |  Retrieve refood processing data by waste ID. |
| `/refood/{idLimbah}/{idPengolahan}` | Edit Refood Processing | PUT |  Update refood processing method by waste ID and processing ID. |
| `/refood/{idLimbah}/{idPengolahan}` | Delete Refood Processing | DELETE |  Delete refood processing method by waste ID and processing ID.  |
