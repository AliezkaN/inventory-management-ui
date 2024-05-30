import { Component, OnInit } from '@angular/core';
import { PredictionProduct } from '../../../../services/models/predictions/prediction-product';
import { PredictionService } from '../../../../services/services/prediction.service';

@Component({
  selector: 'app-predictions',
  templateUrl: './predictions.component.html',
  styleUrls: ['./predictions.component.scss']
})
export class PredictionsComponent implements OnInit {
  predictionProducts: PredictionProduct[] = [];

  constructor(private predictionService: PredictionService) {}

  ngOnInit(): void {
    this.predictionService.predict().subscribe({
      next: (value) => {
        this.predictionProducts = value.predictions;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  isQuantityLow(actualQuantity: number, predictedQuantity: number): boolean {
    return actualQuantity < predictedQuantity;
  }
}
