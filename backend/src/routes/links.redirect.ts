import { Router } from 'express';
import { redirectForCode } from '../services/links.service';

const router = Router();

router.get('/:code', async (req, res, next) => {
  try {
    const targetUrl = await redirectForCode(req.params.code);
    if (!targetUrl) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.redirect(302, targetUrl);
  } catch (err) {
    next(err);
  }
});

export default router;
