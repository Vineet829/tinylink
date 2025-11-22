import { Router } from 'express';
import { createLink, listLinks, getLinkStats, deleteLink } from '../services/links.service';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const { code, targetUrl } = req.body;
    const link = await createLink({ code, targetUrl });
    res.status(201).json(link);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const links = await listLinks();
    res.json(links);
  } catch (err) {
    next(err);
  }
});

router.get('/:code', async (req, res, next) => {
  try {
    const link = await getLinkStats(req.params.code);
    if (!link) return res.status(404).json({ error: 'Not found' });
    res.json(link);
  } catch (err) {
    next(err);
  }
});

router.delete('/:code', async (req, res, next) => {
  try {
    await deleteLink(req.params.code);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
