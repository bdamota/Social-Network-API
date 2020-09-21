const router = require('express').Router();
const {
    addThought,
    removeThought,
    addReaction,
    removeReaction
  } = require('../../controllers/thought-controller');

// /api/comments/<thoughtId>
router.route('/:thoughtId').post(addThought);
router.route('/:thoughtId').post(removeThought);

// /api/thoughts/<thoughtId>/<reactionId>
router
  .route('/:thoughtId/:reactionId')
  .put(addReaction)
  .delete(removeReaction)

router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;