import { Component, Input } from '@angular/core';

import { Result } from '../../../../../../enums/result.enum';

@Component({
    selector: 'swapi-result-heading',
    templateUrl: './result-heading.component.html',
    styleUrls: ['../../styles/_results.scss'],
})
export class ResultHeadingComponent {
    @Input()
    public currentResult: Result;

    public Result: typeof Result = Result;
}
