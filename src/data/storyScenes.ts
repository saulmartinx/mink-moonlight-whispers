import { StoryScene } from '@/types/game';

export const storyScenes: Record<string, StoryScene> = {
  intro: {
    id: 'intro',
    title: 'The First Night',
    text: 'When the sun sleeps, danger wakes. She must move now — for her young, and for herself. Inside the mink\'s den, dimly lit by moonlight, two kits curl beside their mother. One sneezes softly. The mother mink looks up, her eyes glowing faintly in the darkness. The scent of nearby chickens drifts through the forest air.',
    choices: [
      {
        text: 'Venture out into the night to find food',
        nextScene: 'emergence'
      },
      {
        text: 'Wait and observe the surroundings first',
        nextScene: 'observe'
      }
    ]
  },
  
  observe: {
    id: 'observe',
    title: 'Patient Hunter',
    text: 'You pause, listening carefully. The forest is alive with subtle sounds - rustling leaves, distant owl hoots, and the soft clucking of chickens from the nearby farm. Your patience reveals the patterns of the night: a lamp swings gently in the breeze, casting moving shadows that could provide cover.',
    choices: [
      {
        text: 'Now emerge and begin the hunt',
        nextScene: 'emergence'
      }
    ]
  },

  emergence: {
    id: 'emergence',
    title: 'Into the Night',
    text: 'You slip from the mossy burrow into the misty night forest. Moonlight shafts pierce through the canopy, creating pools of silver light that you must avoid. The air carries the scent of prey - chickens, eggs, perhaps even a frog by the nearby stream. Your survival depends on staying hidden.',
    choices: [
      {
        text: 'Head directly toward the chicken coop',
        nextScene: 'approach'
      },
      {
        text: 'Take a longer route through the forest',
        nextScene: 'forest_route'
      }
    ]
  },

  forest_route: {
    id: 'forest_route',
    title: 'Through the Shadows',
    text: 'The longer route keeps you in the deep shadows of the forest. You move silently between ancient trees, your paws finding purchase on moss-covered roots. A trail of chicken feathers leads through the woods - evidence of your target. The farm lights grow brighter ahead.',
    choices: [
      {
        text: 'Follow the feather trail to the coop',
        nextScene: 'approach'
      }
    ]
  },

  approach: {
    id: 'approach',
    title: 'The Farm Approaches',
    text: 'Ambient sounds shift as you near human habitation. The soft crackling of an old fence, distant clucking, the creak of a wheelbarrow. Chickens are visible behind loosely boarded coop walls. Light cones from lamps and house windows create dangerous zones you must navigate carefully.',
    choices: [
      {
        text: 'Begin the theft - approach the chicken coop',
        nextScene: 'theft'
      }
    ]
  },

  theft: {
    id: 'theft',
    title: 'The Theft',
    text: 'You\'ve reached the chicken coop. The chickens sense something but haven\'t spotted you yet. You can see a fat hen roosting near the edge of the coop, within striking distance. One wrong move and their screams will alert the humans and their dog.',
    choices: [
      {
        text: 'Click on the chicken in the game to grab it',
        nextScene: 'theft_continue'
      }
    ]
  },

  theft_continue: {
    id: 'theft_continue',
    title: 'The Theft',
    text: 'Move carefully in the shadows and click on the white chicken to attempt your theft. Stay away from the bright lights - they will expose you to danger.',
    choices: []
  },

  escape: {
    id: 'escape',
    title: 'The Escape',
    text: 'Food secured! But your troubles have just begun. A light inside the house flickers on. Barking begins - deep and threatening. Heavy footsteps echo from within the farmhouse. Rain begins to fall, making the ground slippery but also masking your scent trail.',
    choices: [
      {
        text: 'Run back to the den immediately',
        nextScene: 'return'
      },
      {
        text: 'Take the creek route to avoid detection',
        nextScene: 'creek_route'
      }
    ]
  },

  creek_route: {
    id: 'creek_route',
    title: 'Through the Creek',
    text: 'You splash through the shallow creek, the cold water numbing your paws but washing away your scent. Lightning flashes overhead, illuminating your path for brief moments. The rushing water masks the sound of your movement, but you must be careful not to lose your precious cargo.',
    choices: [
      {
        text: 'Continue to the den',
        nextScene: 'return'
      }
    ]
  },

  return: {
    id: 'return',
    title: 'Home Safe',
    text: 'The forest grows more threatening as you race home, but the familiar scent of your den guides you through the darkness. Lightning flashes and thunder rumbles, but you push forward. Finally, the soft glow of your burrow appears ahead. You slip inside and place your hard-won meal beside your kits. They chirp softly as you curl around them. Rain drums above, but you are safe.',
    choices: [
      {
        text: 'Complete the night\'s hunt',
        nextScene: 'outro'
      }
    ]
  },

  outro: {
    id: 'outro',
    title: 'Survival',
    text: 'This was only the first night. In the wild, survival is never certain. Your kits are fed, but tomorrow will bring new challenges, new hunts, new dangers. The European mink\'s struggle for survival continues, one night at a time.',
    choices: [
      {
        text: 'Play Again',
        nextScene: 'intro'
      },
      {
        text: 'Learn More About European Minks',
        nextScene: 'education'
      }
    ]
  },

  education: {
    id: 'education',
    title: 'Conservation Note',
    text: 'Did you know? European minks are one of the most endangered mammals in Europe, with fewer than 500 individuals remaining in the wild. Habitat loss, pollution, and competition from invasive American minks threaten their survival. Every night hunt like this one is a real struggle for these remarkable creatures.',
    choices: [
      {
        text: 'Return to Game',
        nextScene: 'intro'
      }
    ]
  }
};