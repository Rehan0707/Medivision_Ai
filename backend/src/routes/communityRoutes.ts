import express from 'express';
import { getDiscussions, createDiscussion } from '../controllers/communityController';

const router = express.Router();

router.get('/discussions', getDiscussions);
router.post('/discussions', createDiscussion);

export default router;
