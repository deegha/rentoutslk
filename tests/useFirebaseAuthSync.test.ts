// import { render, act } from '@testing-library/react';
// import { useFirebaseAuthSync } from '@/hooks/useFirebaseAuthSync';
// import * as firebaseAuth from 'firebase/auth';
// import { signIn, signOut } from 'next-auth/react';
//
// jest.mock('firebase/auth', () => ({
//   getAuth: jest.fn(),
//   onIdTokenChanged: jest.fn(),
//   getIdToken: jest.fn(),
// }));
//
// jest.mock('next-auth/react', () => ({
//   signIn: jest.fn(),
//   signOut: jest.fn(),
// }));
//
// describe('useFirebaseAuthSync', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });
//
//   const TestComponent: React.FC = () => {
//     useFirebaseAuthSync();
//     return null;
//   };
//
//   it('должен вызвать signIn при изменении idToken', async () => {
//     const mockUser = {
//       getIdToken: jest.fn().mockResolvedValue('new-token'),
//     } as unknown as firebaseAuth.User;
//
//     (firebaseAuth.onIdTokenChanged as jest.Mock).mockImplementation(
//       (_, callback) => {
//         if (typeof callback === 'function') {
//           callback(mockUser);
//         }
//         return jest.fn();
//       },
//     );
//
//     (firebaseAuth.getIdToken as jest.Mock).mockResolvedValue('new-token');
//
//     await act(async () => {
//       render(<TestComponent />);
//     });
//
//     expect(firebaseAuth.onIdTokenChanged).toHaveBeenCalled();
//     expect(firebaseAuth.getIdToken).toHaveBeenCalled();
//     expect(signIn).toHaveBeenCalledWith('credentials', {
//       redirect: false,
//       idToken: 'new-token',
//     });
//   });
//
//   it('должен вызвать signOut при выходе пользователя', async () => {
//     (firebaseAuth.onIdTokenChanged as jest.Mock).mockImplementation(
//       (_, callback) => {
//         if (typeof callback === 'function') {
//           callback(null);
//         }
//         return jest.fn();
//       },
//     );
//
//     await act(async () => {
//       render(<TestComponent />);
//     });
//
//     expect(firebaseAuth.onIdTokenChanged).toHaveBeenCalled();
//     expect(signOut).toHaveBeenCalledWith({ redirect: false });
//   });
// });
