# Voting App

[📁 Demo Video / Project Files on Google Drive](https://drive.google.com/drive/folders/1emr96hIcklLNPgk46HXF4dLSziEvj6Mb?usp=sharing)



# Voting App - React Native Frontend

A React Native voting application built with Expo that allows users to create features, vote on them, and view voting results. This is the frontend application that connects to a Node.js/Express backend API.

## 🚀 Features

- **Home Screen**: Central navigation hub with quick access to all features
- **Create Vote Screen**: Create new features for users to vote on
- **Vote Screen**: View all available features and submit votes (Yes/No)
- **Results Screen**: View aggregated voting results with:
  - Vote counts (Yes/No)
  - Percentage calculations
  - Visual progress bars
  - Total vote counts

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Expo CLI** (installed globally or via npx)
- **Backend API** running on port 5000 (see Backend Setup section)

## 🛠️ Installation

1. **Clone the repository** (or navigate to the project directory):
   ```bash
   cd VotingApp
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure API endpoint**:
   - Open `config/api.ts`
   - Update `API_BASE_URL` with your backend server address:
     ```typescript
     // For iOS Simulator
     export const API_BASE_URL = 'http://localhost:5000';
     
     // For Android Emulator
     export const API_BASE_URL = 'http://10.0.2.2:5000';
     
     // For Physical Devices
     export const API_BASE_URL = 'http://YOUR_PC_IP:5000';
     ```

## 🏃 Running the App

### Start the development server:
```bash
npm start
# or
npx expo start
```

### Run on specific platforms:

**iOS Simulator:**
```bash
npm run ios
```

**Android Emulator:**
```bash
npm run android
```

**Web Browser:**
```bash
npm run web
```

## 📁 Project Structure

```
VotingApp/
├── app/                          # App screens and routing
│   ├── (tabs)/                  # Tab navigation
│   │   ├── index.tsx            # Home screen
│   │   └── _layout.tsx          # Tab layout
│   ├── create-vote.tsx          # Create feature screen
│   ├── vote.tsx                 # Voting screen
│   ├── results.tsx              # Results screen
│   └── _layout.tsx              # Root layout
├── services/                     # API services
│   ├── featureService.ts       # Feature API calls
│   └── votingService.ts         # Voting API calls
├── config/                       # Configuration
│   └── api.ts                   # API base URL and endpoints
├── components/                   # Reusable components
│   ├── themed-text.tsx
│   ├── themed-view.tsx
│   └── ui/                      # UI components
├── constants/                    # App constants
│   └── theme.ts                 # Theme colors
└── hooks/                        # Custom hooks
    ├── use-color-scheme.ts
    └── use-theme-color.ts
```

## 🔌 Backend API Requirements

This frontend requires a backend API with the following endpoints:

### Features API
- `GET /api/features` - Retrieve all features
  - Response: `[{ _id, name }, ...]`
- `POST /api/features` - Create a new feature
  - Request: `{ name: string }`
  - Response: `{ _id, name }`

### Votes API
- `GET /api/votes` - Retrieve all votes (aggregated)
  - Response: `[{ _id, feature: { _id, name }, yesCount, noCount }, ...]`
- `POST /api/votes` - Submit a vote
  - Request: `{ featureId: string, vote: "yes" | "no" }`
  - Response: `{ message: "Vote saved", data: voteDoc }`

### CORS Configuration
Your backend must have CORS enabled. See `BACKEND_CORS_SETUP.md` for detailed setup instructions.

## ⚙️ Configuration

### API Configuration (`config/api.ts`)

```typescript
export const API_BASE_URL = __DEV__
  ? 'http://localhost:5000'  // Development URL
  : 'http://localhost:5000';  // Production URL

export const API_ENDPOINTS = {
  FEATURES: '/api/features',
  VOTES: '/api/votes',
};
```

**Important Notes:**
- **iOS Simulator**: `http://localhost:5000` works
- **Android Emulator**: Use `http://10.0.2.2:5000`
- **Physical Devices**: Use your PC's IPv4 address (e.g., `http://192.168.1.10:5000`)

To find your IP address:
- **Windows**: Run `ipconfig` in Command Prompt
- **Mac/Linux**: Run `ifconfig` in Terminal

## 📱 Usage

### Creating a Feature
1. Tap "Create Vote" on the home screen
2. Enter a feature name
3. Tap "Save"
4. You'll be redirected to the home screen

### Voting
1. Tap "Vote" on the home screen
2. View all available features
3. Tap "Yes" or "No" for each feature
4. Your vote is saved automatically

### Viewing Results
1. Tap "Results" on the home screen
2. View aggregated results for each feature:
   - Yes votes (count and percentage)
   - No votes (count and percentage)
   - Total votes
   - Visual progress bars

## 🧩 Services

### Feature Service (`services/featureService.ts`)

**Functions:**
- `getAllFeatures()`: Fetches all features from the backend
- `saveFeature(featureName: string)`: Creates a new feature

**Interface:**
```typescript
interface Feature {
  id: string;
  name: string;
  createdAt?: string;
}
```

### Voting Service (`services/votingService.ts`)

**Functions:**
- `saveVote(featureId: string, vote: 'yes' | 'no')`: Submits a vote
- `getAllVotes()`: Fetches all aggregated votes
- `getVoteResults()`: Gets formatted vote results

**Interfaces:**
```typescript
interface VoteResult {
  featureId: string;
  yesCount: number;
  noCount: number;
  totalCount: number;
}
```

## 🐛 Troubleshooting

### CORS Errors
**Error**: `Access to fetch at '...' has been blocked by CORS policy`

**Solution**: 
- Ensure your backend has CORS enabled
- Check `BACKEND_CORS_SETUP.md` for setup instructions
- Verify CORS middleware is added before routes in your Express app

### Connection Errors
**Error**: `Network error: Cannot connect to server`

**Solutions**:
1. Verify backend is running on port 5000
2. Check `API_BASE_URL` in `config/api.ts`
3. For physical devices, use IP address instead of localhost
4. Ensure both devices are on the same network

### Data Not Loading
**Solutions**:
1. Check backend endpoints are correct
2. Verify MongoDB connection in backend
3. Check console logs for detailed error messages
4. Verify API response format matches expected structure

### Build Errors
**Solutions**:
1. Clear cache: `npx expo start -c`
2. Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
3. Check for syntax errors in TypeScript files

## 📦 Dependencies

### Main Dependencies
- `expo`: ~54.0.31
- `expo-router`: ~6.0.21
- `react`: 19.1.0
- `react-native`: 0.81.5
- `@react-navigation/native`: ^7.1.8

### Development Dependencies
- `typescript`: ~5.9.2
- `@types/react`: ~19.1.0
- `eslint`: ^9.25.0

## 🧪 Available Scripts

```bash
npm start          # Start Expo development server
npm run android    # Run on Android emulator
npm run ios        # Run on iOS simulator
npm run web        # Run on web browser
npm run lint       # Run ESLint
```

## 🎨 Theming

The app supports light and dark themes automatically based on system preferences. Theme colors are defined in `constants/theme.ts`.

## 📝 Code Structure

- **Screens**: Located in `app/` directory using Expo Router file-based routing
- **Services**: API communication logic in `services/` directory
- **Components**: Reusable UI components in `components/` directory
- **Configuration**: App settings in `config/` directory

## 🔒 Error Handling

The app includes comprehensive error handling for:
- Network errors (connection issues)
- CORS errors (with helpful messages)
- Validation errors (missing fields)
- Backend errors (400, 404, 409, 500)

All errors are logged to the console with detailed information for debugging.

## 📄 License

Private project

## 👤 Author

Your Name

---

## 📚 Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

For backend setup instructions, see `BACKEND_CORS_SETUP.md` in this repository.


# Voting App Backend

A RESTful API backend for a voting application built with Node.js and Express. This backend allows users to create features and vote on them (yes/no).

## 🚀 Features

- **Feature Management**: Create and retrieve features
- **Voting System**: Vote on features with yes/no options
- **Vote Tracking**: Track vote counts for each feature
- **CORS Enabled**: Configured for cross-origin requests
- **MongoDB Integration**: Persistent data storage using MongoDB

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Voting-App-BE
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/voting-app
   FRONTEND_URL=http://localhost:8082
   ```

   **For MongoDB Atlas:**
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/voting-app?retryWrites=true&w=majority
   ```

4. **Start the server**
   
   For development (with auto-reload):
   ```bash
   npm run dev
   ```
   
   For production:
   ```bash
   npm start
   ```

The server will start on `http://localhost:5000` (or the port specified in your `.env` file).

## 📡 API Endpoints

### Features

#### Get All Features
```
GET /api/features
```
**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Dark Mode",
    "__v": 0
  }
]
```

#### Create Feature
```
POST /api/features
```
**Request Body:**
```json
{
  "name": "Dark Mode"
}
```
**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Dark Mode",
  "__v": 0
}
```
**Error Responses:**
- `400` - name is required
- `409` - Feature already exists

### Votes

#### Get All Votes
```
GET /api/votes
```
**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "feature": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Dark Mode",
      "__v": 0
    },
    "yesCount": 5,
    "noCount": 2
  }
]
```

#### Add Vote
```
POST /api/votes
```
**Request Body:**
```json
{
  "featureId": "507f1f77bcf86cd799439011",
  "vote": "yes"
}
```
**Valid vote values:** `"yes"` or `"no"`

**Response:**
```json
{
  "message": "Vote saved",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "feature": "507f1f77bcf86cd799439011",
    "yesCount": 6,
    "noCount": 2
  }
}
```
**Error Responses:**
- `400` - featureId and vote are required / vote must be yes or no
- `404` - Feature not found

## 📁 Project Structure

```
Voting-App-BE/
├── config/
│   └── db.js              # MongoDB connection configuration
├── controllers/
│   ├── featureController.js  # Feature business logic
│   └── voteController.js     # Vote business logic
├── models/
│   ├── Feature.js         # Feature data model
│   └── Vote.js            # Vote data model
├── routes/
│   ├── featureRoutes.js   # Feature API routes
│   └── voteRoutes.js      # Vote API routes
├── index.js               # Application entry point
├── package.json           # Dependencies and scripts
└── README.md             # Project documentation
```

## 🔐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port number | `5000` |
| `MONGO_URI` | MongoDB connection string | Required |
| `FRONTEND_URL` | Frontend origin for CORS | `http://localhost:8082` |

## 🧪 Testing API Endpoints

You can test the API using tools like:
- **Postman**
- **cURL**
- **Thunder Client** (VS Code extension)
- **Browser** (for GET requests)

### Example cURL Commands

**Create a feature:**
```bash
curl -X POST http://localhost:5000/api/features \
  -H "Content-Type: application/json" \
  -d '{"name": "Dark Mode"}'
```

**Get all features:**
```bash
curl http://localhost:5000/api/features
```

**Add a vote:**
```bash
curl -X POST http://localhost:5000/api/votes \
  -H "Content-Type: application/json" \
  -d '{"featureId": "YOUR_FEATURE_ID", "vote": "yes"}'
```

**Get all votes:**
```bash
curl http://localhost:5000/api/votes
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or your MongoDB Atlas connection string is correct
- Check your `.env` file has the correct `MONGO_URI`

### CORS Errors
- Verify `FRONTEND_URL` in `.env` matches your frontend URL
- Ensure CORS middleware is configured in `index.js`

### Port Already in Use
- Change the `PORT` in your `.env` file
- Or stop the process using the port

## 📝 Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon (auto-reload)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

Omar Alaa

---

**Note:** Make sure to add your `.env` file to `.gitignore` to keep your credentials secure!
