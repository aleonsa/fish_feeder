from servo import Servo
import time

motor = Servo(pin=25)

# Mover el servo de 0 a 90 grados
for angulo in range(0, 91):
    motor.move(angulo)
    time.sleep(0.02)  # Pausa para dar tiempo al servo de moverse

# Mover el servo de 90 a 0 grados
for angulo in range(90, -1, -1):
    motor.move(angulo)
    time.sleep(0.02)  # Pausa para dar tiempo al servo de moverse