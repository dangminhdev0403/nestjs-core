# NestJS MongoDB Starter

A boilerplate project using **NestJS + MongoDB (Mongoose)** + **ConfigModule** + **Environment Variables (.env)**

---

## 🚀 Features

- ✅ NestJS Framework
- ✅ MongoDB integration via Mongoose
- ✅ Environment Variable Management (.env)
- ✅ Module-based folder structure
- ✅ DTO Validation (class-validator)
- ✅ Scalable Project Structure
- ✅ Ready for Production Deployment

---

## 📦 Installation

```bash
# Clone project
git clone https://github.com/your-repo/nest-mongo-starter.git

# Install dependencies
npm install
```

---

## ⚙️ Setup Environment Variables

Create a `.env` file at the root:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/your-db-name
```

You can copy from `.env.example`:

```bash
cp .env.example .env
```

---

## 🛠️ Running the app

```bash
# Development
npm run start:dev

# Production build
npm run build
npm run start:prod
```

NestJS will run at:  
```
http://localhost:3000
```

---

## 🧩 Project Structure

```bash
src/
├── app.module.ts
├── main.ts
│
├── config/
│   ├── configuration.ts
│   └── database.config.ts
│
├── common/
│   ├── constants/
│   ├── decorators/
│   ├── exceptions/
│   ├── guards/
│   └── pipes/
│
├── modules/
│   ├── cats/
│   │   ├── dto/
│   │   ├── interfaces/
│   │   ├── cats.schema.ts
│   │   ├── cats.service.ts
│   │   ├── cats.controller.ts
│   │   └── cats.module.ts
│   └── users/
│
├── shared/
│   └── base.service.ts
│
.env
.env.example
```

---

## 📚 Useful Commands

| Command | Purpose |
|:--|:--|
| `npm run start:dev` | Start dev server with hot reload |
| `npm run build` | Build project for production |
| `npm run start:prod` | Start production server |
| `npm run test` | Run unit tests |

---

## 💃️ Database

- MongoDB connection URL is managed via `.env` file (`MONGO_URI`).
- You can use a local MongoDB server or cloud services like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

---

```

---

## 👌 Contributing

Feel free to submit issues or pull requests.  
Happy Coding! 🚀

