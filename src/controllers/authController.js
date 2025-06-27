import { generateToken } from '../utils/token-generator.js';
import { db } from '../config/firebaseConfig.js';
import bcrypt from 'bcryptjs';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc
} from 'firebase/firestore';

// LOGIN
export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();

    const isValidPassword = await bcrypt.compare(password, userData.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const user = {
      id: userDoc.id,
      email: userData.email
    };

    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    console.error('Error durante login:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
}

// REGISTER
export async function register(req, res) {
  const { email, password } = req.body;

  try {
    // Validación básica
    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña requeridos' });
    }

    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      return res.status(409).json({ message: 'El usuario ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userRef = await addDoc(usersRef, {
      email,
      password: hashedPassword,
    });

    res.status(201).json({ id: userRef.id, message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
}
