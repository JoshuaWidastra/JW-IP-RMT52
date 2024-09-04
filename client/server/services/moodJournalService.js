let entries = [];

const getEntries = async (userId) => {
  return entries.filter(entry => entry.userId === userId);
};

const createEntry = async (userId, content) => {
  const newEntry = { id: Date.now(), userId, content, createdAt: new Date() };
  entries.push(newEntry);
  return newEntry;
};

const updateEntry = async (userId, id, content) => {
  const entry = entries.find(e => e.id === parseInt(id) && e.userId === userId);
  if (entry) {
    entry.content = content;
    entry.updatedAt = new Date();
  }
  return entry;
};

const deleteEntry = async (userId, id) => {
  entries = entries.filter(e => !(e.id === parseInt(id) && e.userId === userId));
};

module.exports = {
  getEntries,
  createEntry,
  updateEntry,
  deleteEntry
};