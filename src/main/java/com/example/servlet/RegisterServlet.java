package com.example.servlet;

import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.bson.Document;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

@WebServlet("/register")
public class RegisterServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    // MongoDB Connection URI
    private static final String MONGO_URI = "mongodb://localhost:27017";
    private static final String DB_NAME = "userDB";
    private static final String COLLECTION_NAME = "users";

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("username");
        String email = request.getParameter("email");
        String password = request.getParameter("password");

        if (username == null || email == null || password == null) {
            response.getWriter().write("Missing parameters!");
            return;
        }

        // Connect to MongoDB and insert user data
        try (MongoClient mongoClient = MongoClients.create(MONGO_URI)) {
            MongoDatabase database = mongoClient.getDatabase(DB_NAME);
            MongoCollection<Document> collection;
            if (email.endsWith("@hospital.gmail.com")) {
                collection = database.getCollection("doctors");
            } else {
                collection = database.getCollection(COLLECTION_NAME);
            }

            Document newUser = new Document("username", username)
                .append("email", email)
                .append("password", password);  // Password should be hashed in production

            // Add user type based on email
            if (email.endsWith("@hospital.gmail.com")) {
                newUser.append("userType", "doctor");
            } else {
                newUser.append("userType", "patient");
            }

            collection.insertOne(newUser);

            // Redirect to Login Page with a success message
            response.sendRedirect("login.jsp?message=Registration%20successful!%20Please%20login.");
        } catch (Exception e) {
            e.printStackTrace();
            response.getWriter().write("Error saving to database");
        }
    }
}
