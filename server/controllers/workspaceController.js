const { Workspace, User, WorkspaceMember } = require("../models");
const crypto = require("crypto");

// Create a new Workspace
exports.createWorkspace = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Generate a unique 6-character invite code
    const inviteCode = crypto.randomBytes(3).toString("hex").toUpperCase();

    const workspace = await Workspace.create({
      name,
      description,
      inviteCode,
      ownerId: req.user.id, // This comes from the Auth Middleware we'll write next
    });

    // Add the creator as an 'Admin' member automatically
    await WorkspaceMember.create({
      UserId: req.user.id,
      WorkspaceId: workspace.id,
      role: "Admin",
    });

    res.status(201).json(workspace);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Join Workspace via Invite Code
exports.joinWorkspace = async (req, res) => {
  try {
    const { inviteCode } = req.body;
    const workspace = await Workspace.findOne({ where: { inviteCode } });

    if (!workspace) {
      return res.status(404).json({ message: "Invalid invite code" });
    }

    // Check if user is already a member
    const existingMember = await WorkspaceMember.findOne({
      where: { UserId: req.user.id, WorkspaceId: workspace.id },
    });

    if (existingMember) {
      return res
        .status(400)
        .json({ message: "You are already a member of this workspace" });
    }

    await WorkspaceMember.create({
      UserId: req.user.id,
      WorkspaceId: workspace.id,
      role: "Member",
    });

    res.json({ message: "Joined successfully", workspace });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add this to your controller
exports.getUserWorkspaces = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: Workspace,
    });
    res.json(user.Workspaces);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
