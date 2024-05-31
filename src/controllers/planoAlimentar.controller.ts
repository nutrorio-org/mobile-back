// export async function ServiceGetFoodPlansByPatient(
// 	patientId: string
// ): Promise<{ data: ResponseFoodPlan[] }> {
// 	return await axios.get(`${FOOD_PLANS_PATH}/list/${patientId}`);
// }
import { Request, Response } from 'express';
import { PlanoAlimentarService } from '../services/planoAlimentar/PlanoAlimentar.service';
const planoAlimentarService = new PlanoAlimentarService();
export class PlanoAlimentarController {
  async list(req: Request, res: Response) {
    try {
      const foodPlans = await planoAlimentarService.list(req.params.patientId);
      //   getListFoodName(foodPlans)
      res.send(foodPlans);
    } catch (error) {
      res.send('error');
    }
  }
}
