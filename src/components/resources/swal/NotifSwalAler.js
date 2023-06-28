import Swal from "sweetalert2";

const NotifSwalAlert = () => {
    const Toast = Swal.mixin({
        iconColor: '#897456',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });

    return Toast;

}

export default NotifSwalAlert;