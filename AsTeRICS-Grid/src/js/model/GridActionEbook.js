import { modelUtil } from '../util/modelUtil';
import { constants } from '../util/constants';
import { Model } from '../externals/objectmodel';
import {GridActionYoutube} from "./GridActionYoutube";

class GridActionEbook extends Model({
    id: String,
    modelName: String,
    modelVersion: String,
    action: [String],
    bookId: [String],
    stepPage: [Number]
}) {
    constructor(properties, elementToCopy) {
        properties = modelUtil.setDefaults(properties, elementToCopy, GridActionEbook);
        super(properties);
        this.id = this.id || modelUtil.generateId('grid-action-ebook');
    }

    static getModelName() {
        return 'GridActionEbook';
    }

    static getActions() {
        return Object.keys(GridActionEbook.actions);
    }
}

GridActionEbook.actions = {
    EB_OPEN = 'EB_OPEN',
    EB_NEXT = 'EB_NEXT',
    EB_PREV = 'EB_PREV',
    EB_FONTSIZE_ENLARGE = 'EB_FONTSIZE_ENLARGE',
    EB_FONTSIZE_REDUCE = 'EB_FONTSIZE_REDUCE'
};

GridActionEbook.defaults({
    id: '', //will be replaced by constructor
    modelName: GridActionEbook.getModelName(),
    modelVersion: constants.MODEL_VERSION,
    bookId: '',
});

export { GridActionEbook };
