Medical Appointment System


Patient Email:  
    username: borhan  
    password: bor

Doctor Email:  
    username: doctor  
    password: bor  

Admin Email:  
    username: admin  
    password: bor  


Tech Stack    
  Frontend: React.js, React Router, Axios, Bootstrap   
  Backend: Node.js, Express.js, Mongoose    
  Database: MongoDB   
  Authentication: JSON Web Token (JWT)   
  Deployment:   
  Frontend: Vercel    
  Backend: Vercel   


1-Project Setup     

  git clone https://github.com/borhanhassan1/AppointmentSystem.git    

2-Install Dependencies    
  -frontend     
    cd client   
    npm install    
  
  -backend    
    cd server    
    npm install    


Project Overview    
This is a Medical Appointment System where:    

  Patients can book and view their appointments.    
  Doctors can see their scheduled appointments.    
  Admins can manage users, and delete appointments.  
  User roles & permissions:   
  
  Patient: Can book & view their appointments.   
  Doctor: Can view their assigned appointments.   
  Admin: delete users, and remove appointments.   


Pending Tasks   
  Handle all errors and validations to improve reliability and prevent incorrect data submissions.  
  Implement proper testing (unit tests & integration tests) to ensure smooth functionality.   
  Enhance admin controls by adding more management features, such as:   
  Viewing detailed user activity logs.   
  Editing doctor and patient details.   
  Implementing advanced filters for appointments and users.   
  Add security layers to prevent attacks:   
  Implement input sanitization to prevent XSS (Cross-Site Scripting).   
  Use parameterized queries or ORMs to prevent SQL Injection.  
  Enforce rate limiting and strong authentication for APIs.  
  Use helmet.js to secure HTTP headers.   
