import mongoose, { Schema } from 'mongoose';

import Question from './Question';
import { QUESTION_FOLLOWED } from '../graphql/resolvers/question-resolvers';
import { pubsub } from '../config/pubsub';

const FollowedQuestionSchema = new Schema ({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }]
});

FollowedQuestionSchema.methods = {
    async userFollowedQuestion(questionId) {
        if (this.questions.some(q => q.equals(questionId))) {
            this.questions.pull(questionId);
            await this.save();

            const question = await Question.decQuestionCount(questionId);

            const q = question.toJSON();

            pubsub.publish(QUESTION_FOLLOWED, { [QUESTION_FOLLOWED]: { ...q } });

            return {
                isFollowed: false,
                ...q
            }
        }

        const question = await Question.incQuestionCount(questionId);

        const q = question.toJSON();

        this.questions.push(questionId);
        await this.save();
        pubsub.publish(QUESTION_FOLLOWED, { [QUESTION_FOLLOWED]: { ...q } });

        return {
            isFollowed: true,
            ...q
        }
    }
};

FollowedQuestionSchema.index({ userId: 1}, { unique: true });

export default  mongoose.model('FollowedQuestion', FollowedQuestionSchema);