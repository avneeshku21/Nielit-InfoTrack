const indianNames = [
    "Aarav Patel", "Aarushi Sharma", "Aditya Singh", "Ananya Gupta", "Arjun Kumar",
    "Avni Reddy", "Dhruv Mehta", "Ishaan Choudhury", "Kavya Joshi", "Mihir Desai",
    "Neha Verma", "Rahul Mishra", "Riya Kapoor", "Rohan Shah", "Saanvi Tiwari",
    "Samaira Bhat", "Siddharth Rao", "Sneha Agarwal", "Vivaan Malhotra", "Yashvi Nair",
    "Aryan Gupta", "Bhavya Singh", "Chetan Kapoor", "Disha Patel", "Esha Reddy",
    "Farhan Khan", "Gauri Desai", "Harsh Mehta", "Ishita Sharma", "Jatin Kumar",
    "Kriti Choudhury", "Lakshya Verma", "Manya Mishra", "Nakul Shah", "Ojasvi Tiwari",
    "Pranav Bhat", "Qasim Rao", "Ritika Agarwal", "Sahil Malhotra", "Tanvi Nair",
    "Uday Gupta", "Vanya Singh", "Yuvraj Kapoor", "Zoya Patel", "Aarohi Reddy",
    "Bharat Mehta", "Chitra Desai", "Dev Sharma", "Eshaan Kumar", "Falguni Choudhury",
    "Gautam Verma", "Hema Mishra", "Ishan Shah", "Jhanvi Tiwari", "Kunal Bhat",
    "Lavanya Rao", "Manan Agarwal", "Nisha Malhotra", "Om Nair", "Prisha Gupta",
  ];
  
  export const staticData = {
    "ALevel-2023": Array.from({ length: 60 }, (_, i) => ({
      id: i + 1,
      name: indianNames[i],  
      grade: (Math.random() * 100).toFixed(2),  
    })),
    "OLevel-2024": Array.from({ length: 60 }, (_, i) => ({
      id: i + 1,
      name: indianNames[i], 
      grade: (Math.random() * 100).toFixed(2), 
    })),
    "IGCSE-2023": Array.from({ length: 60 }, (_, i) => ({
      id: i + 1,
      name: indianNames[i],  
      grade: (Math.random() * 100).toFixed(2),  
    })),
    "SAT-2024": Array.from({ length: 60 }, (_, i) => ({
      id: i + 1,
      name: indianNames[i],  
      grade: (Math.random() * 100).toFixed(2), 
    })),
  };