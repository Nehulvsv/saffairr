const router = require("express").Router();
// const { verify } = require("jsonwebtoken");
const Event = require("../models/Event.model");
const verifyToken = require("../utils/verifyUser");

//create event

router.post("/", async (req, res) => {
  const newEvent = new Event(req.body);
  try {
    const saveEvent = await newEvent.save();

    res.status(200).json(saveEvent);
  } catch (error) {
    return res.status(500).json(error);
  }
});

//update

router.put("updateEvent/:EventId/:userId", async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(500).json("you are not not allowed to update this event");
  }
  try {
    const updateEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(2000).status(updateEvent);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to add an entry to the eventEntries subdocument
router.put("/addEntry/:eventId/:userId", async (req, res) => {
  try {
    // Extract data from the request body
    const { title, content, date, image1, image2, image3 } = req.body;

    // Find the event by its ID
    const event = await Event.findById({ _id: req.params.eventId });

    const existingEntry = event.eventEntries.find(
      (entry) => entry.userId === req.params.userId
    );
    if (existingEntry) {
      return res
        .status(400)
        .json({ message: "User is already a participant in the event" });
    }

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Add the new entry to the eventEntries array
    event.eventEntries.push({
      title,
      userId: req.params.userId,
      content,
      image1,
      image2,
      image3,
      date,
    });

    // Save the updated event
    const updatedEvent = await event.save();

    // Send a response indicating success and the updated event data
    res.status(201).json(updatedEvent);
  } catch (error) {
    // If an error occurs, send an error response
    res.status(500).json({ message: error.message });
  }
});

// router.put("joinEvent/:eventId/:userId", async (req, res) => {
//   if (req.user.isAdmin) {
//     res.status(500).json("you are not allowed to join this event");
//   }
//   try {
//     // const joinEvent = await Event.findByIdAndUpdate(
//     //   req.params.id,
//     //   { $set: req.body },
//     //   { new: true }
//     // );

//     const joinEvent = await Event.findOne({ _id: req.body.eventId });

//     joinEvent.data.push({
//       userId: req.params.userId,
//       title,
//       image1,
//       image2,
//       image3,
//       content,
//     });
//     res.status(2000).status(joinEvent);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//api for list event

router.get("/Events", async (req, res) => {
  res.json(await Event.find().sort({ createdAt: -1 }).limit(3));
});

//api for event page
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const eventDoc = await Event.findById(id);
  res.json(eventDoc);
});

//delete

router.delete(
  "./deleteEvent/:eventId/:userId",
  verifyToken,
  async (req, res) => {
    if (
      !req.user.isAdmin &&
      req.user.id !== req.params.userId &&
      req.user.id !== req.params.postId
    ) {
      return res.status(403).json("you are not allowed to delete this event");
    }

    try {
      await Event.findByIdAndDelete(req.params.eventId);
      res.status(200).json("The Event has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);

module.exports = router;
