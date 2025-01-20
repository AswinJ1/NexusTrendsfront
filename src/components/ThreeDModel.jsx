import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei';

const Model = ({ url }) => {
  const { scene, animations } = useGLTF(url); // Load the GLB model and its animations
  const { actions } = useAnimations(animations, scene); // Hook to control animations

  React.useEffect(() => {
    let animationAction;
    // Check if there are animations available
    if (animations.length > 0) {
      animationAction = actions[animations[0].name];
      if (animationAction) {
        animationAction.play(); // Play the first animation
      }
    }

    // Cleanup function to stop the animation on unmount
    return () => {
      if (animationAction) {
        animationAction.stop();
      }
    };
  }, [actions, animations]);

  // Center the model by adjusting its position
  scene.position.set(0, -1, 0); // Adjust this if needed based on your model's scale and pivot point

  return <primitive object={scene} />;
};

const ThreeDModel = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} />
      <Model url="/model.glb" /> {/* Replace with your GLB file path */}
      <OrbitControls />
    </Canvas>
  );
};

export default ThreeDModel;
