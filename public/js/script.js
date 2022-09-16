document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("aame-seller JS imported successfully!");
  },
  false
);


{("#inpt_search").on('focus', function () {
  $(this).parent('label').addClass('active');
});

("#inpt_search").on('blur', function () {
  if($(this).val().length == 0)
    $(this).parent('label').removeClass('active');
});}

// $(function () {
//     $(window).on('scroll', function () {
//         if ( $(window).scrollTop() > 10 ) {
//             $('.navbar').addClass('active');
//         } else {
//             $('.navbar').removeClass('active');
//         }
//     });
// });