"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export default function NetworkTopology() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Initialize Three.js scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color("#1A1A2E")

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 15

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    containerRef.current.appendChild(renderer.domElement)

    // Controls for interaction
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Create network nodes
    const createNode = (x: number, y: number, z: number, color: string, size = 1) => {
      const geometry = new THREE.SphereGeometry(size, 32, 32)
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        emissive: new THREE.Color(color),
        emissiveIntensity: 0.5,
      })
      const sphere = new THREE.Mesh(geometry, material)
      sphere.position.set(x, y, z)
      scene.add(sphere)
      return sphere
    }

    // Create connection between nodes
    const createConnection = (start: THREE.Vector3, end: THREE.Vector3, color: string) => {
      const points = [start, end]
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const material = new THREE.LineBasicMaterial({
        color: new THREE.Color(color),
        linewidth: 2,
      })
      const line = new THREE.Line(geometry, material)
      scene.add(line)
      return line
    }

    // Create network topology
    // pfSense firewall (central node)
    const pfSense = createNode(0, 0, 0, "#00FFFF", 1.5)

    // Check Point firewall
    const checkPoint = createNode(-5, 3, 0, "#FF00FF", 1.2)
    createConnection(pfSense.position, checkPoint.position, "#FF00FF")

    // Switches (create a ring around pfSense)
    const switches = []
    const switchCount = 10 // Representing 40+ switches with 10 for visualization
    const radius = 8

    for (let i = 0; i < switchCount; i++) {
      const angle = (i / switchCount) * Math.PI * 2
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      const z = Math.random() * 2 - 1

      const switchNode = createNode(x, y, z, "#4CAF50", 0.8)
      switches.push(switchNode)
      createConnection(pfSense.position, switchNode.position, "#4CAF50")
    }

    // UniFi access points (connected to switches)
    const accessPoints = []
    const apCount = 11

    for (let i = 0; i < apCount; i++) {
      const parentSwitch = switches[i % switches.length]
      const offset = new THREE.Vector3(Math.random() * 4 - 2, Math.random() * 4 - 2, Math.random() * 4 - 2)
      const position = new THREE.Vector3().addVectors(parentSwitch.position, offset)

      const ap = createNode(position.x, position.y, position.z, "#FFC107", 0.6)
      accessPoints.push(ap)
      createConnection(parentSwitch.position, ap.position, "#FFC107")
    }

    // Add some random data traffic visualization
    const trafficParticles = new THREE.Group()
    scene.add(trafficParticles)

    const createTrafficParticle = (start: THREE.Vector3, end: THREE.Vector3, color: string) => {
      const geometry = new THREE.SphereGeometry(0.1, 8, 8)
      const material = new THREE.MeshBasicMaterial({ color: new THREE.Color(color) })
      const particle = new THREE.Mesh(geometry, material)

      // Position at start
      particle.position.copy(start)

      // Store target for animation
      particle.userData.start = start.clone()
      particle.userData.end = end.clone()
      particle.userData.progress = 0
      particle.userData.speed = 0.01 + Math.random() * 0.02

      trafficParticles.add(particle)
      return particle
    }

    // Create some initial traffic
    for (let i = 0; i < 20; i++) {
      const sourceIndex = Math.floor(Math.random() * (switches.length + accessPoints.length))
      let source, target

      if (sourceIndex < switches.length) {
        source = switches[sourceIndex]
        target = Math.random() > 0.5 ? pfSense : accessPoints[Math.floor(Math.random() * accessPoints.length)]
      } else {
        source = accessPoints[sourceIndex - switches.length]
        target = switches[Math.floor(Math.random() * switches.length)]
      }

      createTrafficParticle(source.position, target.position, Math.random() > 0.8 ? "#FF0000" : "#00FFFF")
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      // Update controls
      controls.update()

      // Animate traffic particles
      trafficParticles.children.forEach((particle) => {
        particle.userData.progress += particle.userData.speed

        if (particle.userData.progress >= 1) {
          // Reset particle or remove it
          if (Math.random() > 0.3) {
            particle.userData.progress = 0

            // Possibly change direction
            if (Math.random() > 0.5) {
              const temp = particle.userData.start
              particle.userData.start = particle.userData.end
              particle.userData.end = temp
            }
          } else {
            trafficParticles.remove(particle)

            // Create a new particle somewhere else
            if (trafficParticles.children.length < 30 && Math.random() > 0.5) {
              const sourceIndex = Math.floor(Math.random() * (switches.length + accessPoints.length))
              let source, target

              if (sourceIndex < switches.length) {
                source = switches[sourceIndex]
                target = Math.random() > 0.5 ? pfSense : accessPoints[Math.floor(Math.random() * accessPoints.length)]
              } else {
                source = accessPoints[sourceIndex - switches.length]
                target = switches[Math.floor(Math.random() * switches.length)]
              }

              createTrafficParticle(source.position, target.position, Math.random() > 0.8 ? "#FF0000" : "#00FFFF")
            }
          }
        } else {
          // Move particle along path
          particle.position.lerpVectors(particle.userData.start, particle.userData.end, particle.userData.progress)
        }
      })

      // Render scene
      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return

      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full" />
}
