import jsonData from "../../endpoints.json"
import { Request, Response } from "express";

export const getEndpoints = (req: Request, res: Response,) => {
  res.json(jsonData);
};