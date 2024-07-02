const optimizelySdk = require('@optimizely/optimizely-sdk');

const optimizelyFeatureExperimentation = async () => {

    const optimizely = optimizelySdk.createInstance({
        sdkKey: process.env.OPTIMIZELY_API_KEY,
    });

    const optimizelyInstance = optimizely.onReady().then(({ success, reason }) => {
        if (!success) {
            console.log(`client initialization unsuccessful, reason: ${reason}`);
            return;
        }

        let hasOnFlags = false;
        const userId = (Math.floor(Math.random() * (10000 - 1000) + 1000)).toString();
        const user = optimizely.createUserContext(userId);
        const decision = user.decide('test_product_sort');
        const variationKey = decision.variationKey;
        if (variationKey === null) {
            console.log('decision error: ', decision['reasons']);
            return 'Something went wrong!';
        }
        const sortMethod = decision.variables['test_sort_method'];
        
        if (decision.enabled) {
            hasOnFlags = true;
        }

        return {
            'userId': user.getUserId(),
            'decision_enabled' : decision.enabled,
            'variationKey': variationKey,
            'sortMethod': sortMethod,
            'decision_ruleKey': decision.ruleKey,
        }

        
        // let hasOnFlags = false;
        // for (let i = 0; i < 10; i++) {
        //     // to get rapid demo results, generate random users. Each user always sees the same variation unless you reconfigure the flag rule.
        //     const userId = (Math.floor(Math.random() * (10000 - 1000) + 1000)).toString();
        
        //     //MARNEL - Added attributes
        //     // const attributes = { logged_in: true };

        //     // Create hardcoded user & bucket user into a flag variation
        //     const user = optimizely.createUserContext(userId);
        //     // const user = optimizely.createUserContext(userId, attributes);
        //     // console.log('user.userId: ', user.userId, ' || attributes.logged_in: ', attributes.logged_in)
        
        //     // "product_sort" corresponds to a flag key in your Optimizely project
        //     const decision = user.decide('test_product_sort');
        //     const variationKey = decision.variationKey;
        
        //     // did decision fail with a critical error?
        //     if (variationKey === null) {
        //         console.log('decision error: ', decision['reasons']);
        //     }
            
        //         // get a dynamic configuration variable
        //     // "sort_method" corresponds to a variable key in your Optimizely project
        //     const sortMethod = decision.variables['test_sort_method'];
        
        //     if (decision.enabled) {
        //         hasOnFlags = true;
        //     }
        
        //     // Mock what the users sees with print statements (in production, use flag variables to implement feature configuration)
        //     // always returns false until you enable a flag rule in your Optimizely project
        //     console.log(`\nFlag ${decision.enabled ? 'on' : 'off'}. User number ${user.getUserId()} saw flag variation: ${variationKey}`
        //         + ` and got products sorted by: ${sortMethod} config variable as part of flag rule: ${decision.ruleKey}`);

        //     return {
        //         'userId': user.getUserId(),
        //         'decision_enabled' : decision.enabled,
        //         'variationKey': variationKey,
        //         'sortMethod': sortMethod,
        //         'decision_ruleKey': decision.ruleKey,
        //     }
        // }

    
        // if (!hasOnFlags) {
        // console.log('\n\nFlag was off for everyone. Some reasons could include' +
        //     '\n1. Your sample size of visitors was too small. Rerun, or increase the iterations in the FOR loop' +
        //     '\n2. By default you have 2 keys for 2 project environments (dev/prod). Verify in Settings>Environments that you used' +
        //     ' the right key for the environment where your flag is toggled to ON.' +
        //     '\nCheck your key at https://app.optimizely.com/v2/projects/<your-project-id>/settings/implementation');
        // }



    });

    return optimizelyInstance;
}

module.exports = { optimizelyFeatureExperimentation }
