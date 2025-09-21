import toast from "react-hot-toast";

export const validateForm = (formData: { name: string; description: string; }) => {
    if (!formData.name.trim()) {
      toast.error("Task name cannot be empty");
      return false;
    }
    if (!formData.description.trim()) {
      toast.error("Task description cannot be empty");
      return false;
    }
    if (formData.name.length < 3) {
      toast.error("Task name must be at least 3 characters long");
      return false;
    }
    if (formData.description.length < 10) {
      toast.error("Description must be at least 10 characters long");
      return false;
    }
    if (formData.name.length > 50) {
      toast.error("Task name cannot exceed 50 characters");
      return false;
    }
    if (formData.description.length > 200) {
      toast.error("Description cannot exceed 200 characters");
      return false;
    }
    return true;
  };

  export const validateRegisterForm = (formData: { name: string; email: string; password: string; }) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.name.trim()) {
      toast.error("Name cannot be empty");
      return false;
    }
    if (formData.name.length < 3) {
      toast.error("Name must be at least 3 characters long");
      return false;
    }
    if (formData.name.length > 30) {
      toast.error("Name cannot exceed 30 characters");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email cannot be empty");
      return false;
    }
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    return true;
  }

  export const validateLoginForm = (formData: { email: string; password: string; }) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!formData.email.trim()) {
      toast.error("Email cannot be empty");
      return false;
    }
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    return true;
  }