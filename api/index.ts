module.exports = async (req: any, res: any) => {
  try {
    const { connectDB } = await import("../src/config/db");
    const appModule = await import("../src/app");
    
    // Ensure database connects in serverless environment
    await connectDB();
    
    const app = appModule.default;
    return app(req, res);
  } catch (error: any) {
    console.error("Initialization error:", error);
    res.status(500).json({
      success: false,
      message: "Server crashed during initialization",
      error: error.message,
      stack: error.stack
    });
  }
};
