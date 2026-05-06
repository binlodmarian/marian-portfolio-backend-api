import * as adminService from "../services/admin.service";
// ── Users ─────────────────────────────────────────────────────────────────────
export const getAllUsers = async (_req, res) => {
    try {
        const result = await adminService.getAllUsers();
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await adminService.getUserById(id);
        res.json(result);
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
};
export const promoteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await adminService.promoteUser(id);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const demoteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await adminService.demoteUser(id);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await adminService.deleteUser(id);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// ── Tasks ─────────────────────────────────────────────────────────────────────
export const getAllTasks = async (_req, res) => {
    try {
        const result = await adminService.getAllTasks();
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const deleteAnyTask = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await adminService.deleteAnyTask(id);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
//# sourceMappingURL=admin.controller.js.map